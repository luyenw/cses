const {buildSchema} = require('graphql')
var schema = buildSchema(`
    input ResultInput{
        submission_id: String!
        testcase_id: String!
        user_output: String
        verdict: Int!
        code_time: Float
        code_size: Int
    }
    type Result{
        submission_id: String!
        testcase_id: String!
        user_output: String
        verdict: Int!
        code_time: Float
        code_size: Int
    }
    type Testcase{
        id: String
        task_id: Int
        input: String
        output: String
        createdAt: String
        updatedAt: String
    }
    type Mutation{
        updateResult(input: ResultInput): Result 
    }
    type Query {
        getTestcases(task_id: Int): [Testcase] 
    }
`)
module.exports = schema