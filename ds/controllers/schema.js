const {buildSchema} =  require('graphql')
var schema = buildSchema(`
    input CommentInput{
        topic_id: Int!
        author_id: Int!
        parent_id: String!
        body: String
    }
    type User{
        id: String!
        name: String!
        imgUrl: String
    }
    type Comment{
        id: String
        author: User
        body: String
        parent_id: String
        createdAt: String
    }
    type Mutation{
        createMessage(input: CommentInput): Comment 
    }
    type Query {
        getComments(topic_id: Int): [Comment] 
        commentReplies(comment_id: String): [Comment]
    }
`)
module.exports = schema