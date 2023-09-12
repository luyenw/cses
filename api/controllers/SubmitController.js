const Submission = require('../models/Submission')
const Task = require('../models/Task')
const User = require('../models/User')
const send = require('../rabbitmq/sender')
const {Validation} = require('../validations/validations')
const crypto = require('crypto')

controller = {}
module.exports = () =>{
    controller.get = async (req, res)=>{
        const task_id = req.params.id
        const user = await User.findOne({where: {username: res.locals.username}})
        const user_id = await user.dataValues.id
        const submissions = await Submission.findAll({where: {task_id: task_id, user_id: user_id}})
        return res.json(submissions)
    }
    controller.get2 = async (req, res)=>{
        const task_id = req.params.id
        const user_id = req.params.id2
        const submissions = await Submission.findAll({where: {task_id: task_id, user_id: user_id}})
        return res.json(submissions)
    }
    controller.post = async (req, res)=>{
        inp = req.body
        uploader = res.locals.username
        try {
            const validatedData = Validation.validateSubmission(inp);
        } catch (error) {
            return res.json({'Validation error:': error.message});
        }
        const task = await Task.findOne({where:{id: inp.task_id}})
        if (!task){
            return res.status(422).json({'msg': 'task id doesn\'t exist'})
        }
        const user = await User.findOne({where: {username: uploader}})
        const user_id = await user.dataValues.id
        if (user_id === "undefined" || user_id != inp.user_id){
            return res.status(422).json({'msg': 'user id doesn\'t exist'})
        }
        // save submission to db
        const submission = await Submission.create({
            id: crypto.randomBytes(15).toString('hex'),
            task_id: inp.task_id,
            user_id: inp.user_id,
            lang: inp.lang,
            source_code: inp.source_code
        })
        // send to message queue
        if(submission) send(JSON.stringify(submission.dataValues))
        //
        return res.json(submission)
    }
    return controller
}