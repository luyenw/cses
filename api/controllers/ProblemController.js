const Problem = require("../schemas/Problem");
const Submission = require("../schemas/Submission");
const TestCase = require("../schemas/Testcase");
const User = require("../schemas/User");
const { Validation } = require("../validations/validations");
const crypto = require("crypto");

var controller = {};
controller.get = async (req, res) => {
  const id = req.params.id;
  const problem = await Problem.findByPk(id);
  if (problem) {
    return res.json(problem);
  }
  return res.json({ msg: "not found" });
};
controller.create = async (req, res) => {
  const inp = req.body;
  // validate input
  try {
    const validatedData = Validation.validateProblem(inp);
    let { testcases, ...inp_problem } = inp;
    const problem = new Problem({
      title: inp_problem.title,
      content: inp_problem.content,
      difficulty: inp_problem.difficulty,
      time_limit: inp_problem.time_limit,
      memory_limit: inp_problem.memory_limit,
    });
    const new_problem = await Problem.create(problem.dataValues);
    var testcase_list = [];
    for (var i in testcases) {
      const testcase = new TestCase({
        problem_id: new_problem.id,
        id: crypto.randomBytes(15).toString("hex"),
        input: testcases[i].input,
        output: testcases[i].output,
      });
      testcase_list.push(testcase.dataValues);
    }
    const new_testcases = await TestCase.bulkCreate(testcase_list);
    return res
      .status(200)
      .json({ problem: new_problem, testcase_list: new_testcases });
  } catch (error) {
    console.log(error);
    res.json({ "Validation error:": error.message });
  }
};
controller.delete = async (req, res) => {
  const problem_id = req.params.id;
  const removed_problem = await Problem.findByPk(problem_id);
  if (removed_problem) {
    await removed_problem.destroy();
  } else {
    return res.json({ msg: "not found problem with id " + problem_id });
  }
  return res.json(removed_problem);
};
controller.getAllSubmissions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const offset = (page - 1) * limit;

  const problem_id = req.params.id;
  const { count, rows } = await Submission.findAndCountAll({
    order: [["updatedAt", "DESC"]],
    where: { problem_id: problem_id, contest_id: 0 },
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
};
controller.getSubmissionsByUser = async(req, res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const offset = (page - 1) * limit;

  const problem_id = req.params.id;
  const user = await User.findOne({
    where: { username: res.locals.username },
  });
  const user_id = await user.dataValues.id;
  var submissions = await Submission.findAll({
    order: [["updatedAt", "DESC"]],
    where: { problem_id: problem_id, user_id: user_id, contest_id: 0 },
    offset,
    limit,
  });
  submissions = await Promise.all(
    submissions.map(async (x) => {
      delete x.dataValues["source_code"];
      return x;
    })
  );
  return res.status(202).json(submissions);
}
module.exports = controller;
