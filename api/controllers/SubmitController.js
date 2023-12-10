const Submission = require("../schemas/Submission");
const Task = require("../schemas/Task");
const User = require("../schemas/User");
const { Validation } = require("../validations/validations");
const crypto = require("crypto");
const RabbitMQ = require("../rabbitmq/index");
const Result = require("../schemas/Result");
const TestCase = require("../schemas/Testcase");

var controller = {};
module.exports = () => {
  // controller.get_submission_details = async (req, res) => {
  //   const { submission_id, id } = req.params;
  //   try {
  //     const submission = await Submission.findByPk(submission_id);
  //     const testcases = await TestCase.findAll({ where: { task_id: id } });
  //     const resultsPromises = testcases.map(async (x) => {
  //       const result = await Result.findOne({
  //         where: {
  //           submission_id,
  //           testcase_id: x.id,
  //         },
  //       });
  //       return { input: x.input, output: x.output, ...result.dataValues };
  //     });
  //     const results = await Promise.all(resultsPromises);
  //     return res.status(200).send({
  //       source_code: submission.source_code,
  //       results
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send({ error: "Internal Server Error" });
  //   }
  // };
  controller.get_submissions_by_user_id = async (req, res) => {
    const problem_id = req.params.problem_id;
    const user = await User.findOne({
      where: { username: res.locals.username },
    });
    const user_id = await user.dataValues.id;
    const submissions = await Submission.findAll({
      where: { task_id: problem_id, user_id: user_id },
    });
    return res.json(submissions);
  };
  controller.post_new_submission = async (req, res) => {
    inp = req.body;
    uploader = res.locals.username;
    // validate input
    try {
      const validatedData = Validation.validateSubmission(inp);
    } catch (error) {
      return res.json({ "Validation error:": error.message });
    }
    const task = await Task.findOne({ where: { id: inp.task_id } });
    if (!task) {
      return res.status(422).json({ msg: "task id doesn't exist" });
    }
    const user = await User.findOne({ where: { username: uploader } });
    const user_id = await user.dataValues.id;
    if (user_id === "undefined" || user_id != inp.user_id) {
      return res.status(422).json({ msg: "user id doesn't exist" });
    }
    // save submission to db
    const submission = await Submission.create({
      id: crypto.randomBytes(15).toString("hex"),
      task_id: inp.task_id,
      user_id: inp.user_id,
      lang: inp.lang,
      source_code: inp.source_code,
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
  controller.get_submission_details = async (req, res)=>{
    const id = req.params.submission_id
    var submission = await Submission.findByPk(id)
    var results = await Result.findAll({where: {submission_id: id}})
    results = await Promise.all(results.map(async (x)=>{
      x.dataValues.testcase = await TestCase.findByPk(x.testcase_id)
      return x
    }))
    return res.json({source_code: submission.dataValues.source_code, results: results})
  }
  controller.get_submissions_by_problem_id = async (req, res)=>{
    const problem_id = req.params.problem_id
    var submissions = await Submission.findAll({ include: [{ model: User }]});
    return res.status(200).json(submissions)
  }
  return controller;
};
