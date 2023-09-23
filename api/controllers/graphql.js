const Result = require('../schemas/Result')
const Testcase = require('../schemas/Testcase')
const resolvers ={
    getTestcases: async({task_id})=>{
        const testcases = await Testcase.findAll({where: {task_id: task_id}})
        return testcases
    },
    updateResult: async({input})=>{
        var result = await Result.findOne({where:{submission_id: input.submission_id, testcase_id: input.testcase_id}})
        if(!result)
        result = new Result({
            submission_id: input.submission_id,
            testcase_id: input.testcase_id,
            verdict: input.verdict
        })
        await result.save()
        return result.dataValues
    }
}
module.exports = resolvers