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
  controller.get_result = async (req, res) => {
    const { submission_id, id } = req.params;
    try {
      const submission = await Submission.findByPk(submission_id);
      const testcases = await TestCase.findAll({ where: { task_id: id } });
      const resultsPromises = testcases.map(async (x) => {
        const result = await Result.findOne({
          where: {
            submission_id,
            testcase_id: x.id,
          },
        });
        return { input: x.input, output: x.output, ...result.dataValues };
      });
      const results = await Promise.all(resultsPromises);
      return res.status(200).send({
        source_code: submission.source_code,
        results
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  };
  controller.get = async (req, res) => {
    const task_id = req.params.id;
    const user = await User.findOne({
      where: { username: res.locals.username },
    });
    const user_id = await user.dataValues.id;
    const submissions = await Submission.findAll({
      where: { task_id: task_id, user_id: user_id },
    });
    return res.json(submissions);
  };
  controller.post = async (req, res) => {
    inp = req.body;
    uploader = res.locals.username;
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
  return controller;
};
