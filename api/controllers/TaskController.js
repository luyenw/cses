const Task = require('../schemas/Task');
const TestCase = require('../schemas/Testcase');
const { Validation } = require('../validations/validations');
const crypto = require('crypto')

controller = {}
module.exports=()=>{
    controller.get = async (req, res)=>{
        const id = req.params.id;
        const task = await Task.findByPk(id)
        if (task){
            return res.json(task)
        }
        return res.json({'msg': 'not found'})
    }
    controller.create=async(req, res)=>{
        const inp = req.body;
        // validate input
        try {
            const validatedData = Validation.validateTask(inp);
            let {testcases, ...inp_task} = inp
            const task = new Task({
                title: inp_task.title,
                content: inp_task.content,
                difficulty: inp_task.difficulty,
                time_limit: inp_task.time_limit,
                memory_limit: inp_task.memory_limit,
            })
            const new_task = await Task.create(task.dataValues)
            var testcase_list = []
            for (var i in testcases){
                const testcase = new TestCase({
                    task_id: new_task.id,
                    id: crypto.randomBytes(15).toString('hex'),
                    input: testcases[i].input,
                    output: testcases[i].output
                })
                testcase_list.push(testcase.dataValues)
            }
            const new_testcases = await TestCase.bulkCreate(testcase_list)
            return res.status(200).json({'task': new_task, 'testcase_list': new_testcases})
        } catch (error) {
            console.log(error)
            res.json({'Validation error:': error.message});
        }
    }
    controller.delete=async(req, res)=>{
        const task_id = req.params.id
        const removed_task = await Task.findByPk(task_id)
        if(removed_task){
            await removed_task.destroy()
        }else{
            return res.json({'msg': 'not found task with id '+task_id})
        }
        return res.json(removed_task)
    }
    return controller;
}