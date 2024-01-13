const User = require("../schemas/User");
const Result = require("../schemas/Result");
const Submission = require("../schemas/Submission");
const Problem = require("../schemas/Problem");
const TestCase = require("../schemas/Testcase");
const controller = {};
controller.get = async (req, res) => {
  const submission_id = req.params.id;
  var submission = await Submission.findByPk(submission_id);
  if (!submission) return res.json({ msg: "submission not found" });
  submission = submission.dataValues;
  var user = await User.findOne({ where: { username: res.locals.username } });
  user = user.dataValues;
  if (user.id != submission.user_id) return res.json({ msg: "not found" });
  const test_cases = await TestCase.findAll({
    where: { problem_id: submission.problem_id },
  });
  var results = [];
  for (var i = 0; i < test_cases.length; i++) {
    const result = await Result.findOne({
      where: { submission_id: submission_id, testcase_id: test_cases[i].id },
    });
    results.push(result?.dataValues);
  }
  return res.json(results);
};
module.exports = controller;
