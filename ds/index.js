const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const app = express()
const connect = require('./config/db/index.js')
connect()
var schema = buildSchema(`
    input CommentInput{
        topic_id: String!
        author_id: Int!
        parent_id: String!
        body: String
    }
    type User{
        id: String!
        name: String!
    }
    type Comment{
        id: ID!
        author: User
        body: String
        parent_id: String
    }
    type Mutation{
        createMessage(input: CommentInput): String 
    }
    type Query {
        getComments(topic_id: String): [Comment] 
        commentReplies(comment_id: String): [Comment]
    }
`)
const resolvers = require('./controllers/graphql.js')
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers, 
    graphiql: true
}))
app.get('/', (req, res)=>{
    return res.json({'msg':'ok'})
})

app.listen(3002, ()=>{
    console.log('Server is running on port 3002')
})