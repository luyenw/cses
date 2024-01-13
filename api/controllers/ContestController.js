const { UUIDV4 } = require("sequelize");
const Contest = require("../schemas/Contest");
const Problem = require("../schemas/Problem");
const ProblemContest = require("../schemas/ProblemContest");
const { v4: uuidv4 } = require("uuid");
const { Validation } = require("../validations/validations");
const User = require("../schemas/User");
const Submission = require("../schemas/Submission");

function checkEventOccurrence(start, length) {
  var startDate = new Date(start);
  var endDate = new Date(startDate.getTime() + length * 60000); // 60000 milliseconds = 1 phút
  var currentDate = new Date();
  if (currentDate >= endDate) {
    return true;
  } else {
    return false;
  }
}

const controller = {};
controller.getAllContest = async (req, res) => {
  var contests = [];
  try {
    contests = await Contest.findAll({ order: [["start", "DESC"]] });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json(contests);
};
controller.getContestById = async (req, res) => {
  const contest_id = req.params.id;
  var contest = null;
  status_code = 200;
  try {
    contest = await Contest.findByPk(contest_id);
  } catch (err) {
    console.log(err);
    status_code = 404;
  }
  return res.status(status_code).json(contest);
};
controller.getContestProblemsById = async (req, res) => {
  const contest_id = req.params.id;
  var contest = null;
  try {
    contest = await Contest.findByPk(contest_id);
    contest = contest.dataValues;
  } catch (err) {
    console.log(err);
  }
  if (contest == null) {
    return res.status(404).json([]);
  }
  // else {
  //   if (checkEventOccurrence(contest.start, contest.length)) {
  //     return res
  //       .status(404)
  //       .json({ 'error': "Registration for the contest has expired" });
  //   }
  // }
  var problems = [];
  try {
    problems = await ProblemContest.findAll({
      where: { contest_id: contest_id },
      include: [{ model: Problem }],
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
  problems = problems.map((x) => {
    var { problem, contest_id } = x.dataValues;
    return problem;
  });
  return res.status(200).json({contest_id: contest_id, problems: problems});
};
controller.postContest = async (req, res) => {
  const problem_ids = req.body.problems;

  var not_found_problem_id = [];
  const problems = await Promise.all(
    problem_ids.map(async (id) => {
      const problem = await Problem.findByPk(id);
      if (problem == null) {
        not_found_problem_id.push(id);
      }
      return id;
    })
  );
  if (not_found_problem_id.length)
    return res.status(404).json({
      status: "404",
      error: `Not found problems with id [${not_found_problem_id}]`,
    });
  const contest = await Contest.create({
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
  });
  await Promise.all(
    problem_ids.map(async (id) => {
      await ProblemContest.create({
        problem_id: id,
        contest_id: contest.dataValues.id,
      });
    })
  );
  return res.status(200).json(contest);
};
controller.getSubmissionsByContestId = async (req, res) => {};
controller.postSubmissionByContestId = async (req, res) => {
  inp = req.body;
  uploader = res.locals.username;
  // validate input
  try {
    const validatedData = Validation.validateSubmission(inp);
  } catch (error) {
    return res.json({ "Validation error:": error.message });
  }
  const problem_ids = await ProblemContest.findAll({
    where: { problem_id: req.params.id},
  });
  if (!problem_ids.includes(inp.problem_id))
    return res.status(422).json({ msg: "problem id doesn't exist" });
  const problem = await Problem.findOne({ where: { id: inp.problem_id } });
  if (!problem) {
    return res.status(422).json({ msg: "problem id doesn't exist" });
  }
  const user = await User.findOne({ where: { username: uploader } });
  const user_id = await user.dataValues.id;
  if (user_id === "undefined" || user_id != inp.user_id) {
    return res.status(422).json({ msg: "user id doesn't exist" });
  }
  // save submission to db
  const submission = await Submission.create({
    id: uuidv4(),
    problem_id: inp.problem_id,
    user_id: inp.user_id,
    lang: inp.lang,
    source_code: inp.source_code,
    contest_id: inp.contest_id,
  });
  // send to message queue
  if (submission)
    RabbitMQ.getInstance().send(
      "task_queue",
      JSON.stringify(submission.dataValues)
    );
  //
  return res.json(submission);
};
controller.getSubmitsByProblemId = async(req, res)=>{

  const problem_id = req.params.problem_id 
  const contest_id = req.params.contest_id

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const offset = (page - 1) * limit;

  const { count, rows } = await Submission.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    where: { problem_id: problem_id, contest_id: contest_id },
    offset,
    limit,
    include: [{ model: User }],
  });
  var submissions = await Promise.all(
    rows.map(async (x) => {
      x.dataValues.by = x.dataValues.user.username;
      delete x.dataValues["user"];
      delete x.dataValues["source_code"];
      return x.dataValues;
    })
  );
  return res.status(200).json(submissions);
}
controller.getSubmitsByUser = async(req, res)=>{

  const problem_id = req.params.problem_id 
  const contest_id = req.params.contest_id

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const offset = (page - 1) * limit;

  const user = await User.findOne({
    where: { username: res.locals.username },
  });
  const user_id = await user.dataValues.id;
  var submissions = await Submission.findAll({
    order: [["updatedAt", "DESC"]],
    where: { problem_id: problem_id, user_id: user_id, contest_id: contest_id },
    offset,
    limit,
  });
  submissions = await Promise.all(
    submissions.map(async (x) => {
      delete x.dataValues["source_code"];
      return x;
    })
  );
  return res.status(200).json(submissions);
}
module.exports = controller;
