const Submission = require("../schemas/Submission");
const Problem = require("../schemas/Problem");
const User = require("../schemas/User");
const { Validation } = require("../validations/validations");
const crypto = require("crypto");
const RabbitMQ = require("../rabbitmq/index");
const Result = require("../schemas/Result");
const TestCase = require("../schemas/Testcase");
const { v4: uuidv4 } = require("uuid");
var controller = {};
controller.post_new_submission = async (req, res) => {
  inp = req.body;
  console.log(inp)
  uploader = res.locals.username;
  // validate input
  try {
    const validatedData = Validation.validateSubmission(inp);
  } catch (error) {
    console.log(error)
    return res.json({ "Validation error:": error.message });
  }
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
    contest_id: Number(inp.contest_id)
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
controller.get_submission_details = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    var submission = await Submission.findByPk(id);
    var results = await Result.findAll({ where: { submission_id: id } });
    console.log(results)
    results = await Promise.all(
      results.map(async (x) => {
        x.dataValues.testcase = await TestCase.findByPk(x.testcase_id);
        return x;
      })
    );
  } catch (err) {
    console.log(err);
  }
  return res.json({
    source_code: submission.dataValues.source_code,
    results: results,
  });
};
module.exports = controller;
