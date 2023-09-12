const User = require("../models/User")
const Result = require("../models/Result")
const Submission = require("../models/Submission")
const Task = require("../models/Task")
const TestCase = require("../models/Testcase")
const controller = {}

module.exports =()=> {
    controller.get= async (req, res)=>{
        const submission_id = req.params.id
        var submission = await Submission.findByPk(submission_id)
        if(!submission) return res.json({'msg': 'submission not found'})
        submission = submission.dataValues
        var user = await User.findOne({where: {username: res.locals.username}})
        user = user.dataValues
        if(user.id != submission.user_id) return res.json({'msg': 'not found'})
        const test_cases = await TestCase.findAll({where: {task_id: submission.task_id}})
        var results = []
        for(var i=0;i<test_cases.length;i++){
            const result = await Result.findOne({where: {submission_id: submission_id, testcase_id: test_cases[i].id}})
            results.push(result?.dataValues)
        }
        return res.json(results)
    }
    return controller
}