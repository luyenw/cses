const Comment = require("../schema/Comment")
const request = require('request-promise-native')

const resolvers = {
    createMessage: async ({input})=>{
        const new_comment = new Comment({
            topic_id: input.topic_id,
            parent_id: input.parent_id,
            author_id: input.author_id,
            body: input.body,
        })
        await new_comment.save()
        console.log(new_comment)
        const {_id, ...rest} = new_comment
        var user = await request('http://localhost:3001/user/'+input.author_id)
        user = JSON.parse(user)
        return {author: user, ...rest, body: input.body, createdAt: new Date(), id: _id.toString()}
    },
    getComments: async ({topic_id})=>{
        const comments = await Comment.find({topic_id: topic_id, parent_id: "0"}).sort({createdAt: 'descending'}).exec()
        results = []
        for(var i=0;i<comments.length;i++){
            var user = await request('http://localhost:3001/user/'+comments[i].author_id)
            user = JSON.parse(user)
            const {_id, ...rest} = comments[i]._doc
            results.push({author: user, ...rest, id: comments[i]._doc._id.toString()}) 
        }
        return results
    },
    commentReplies: async ({comment_id})=>{
        const comments = await Comment.find({parent_id: comment_id}).exec()
        results = []
        for(var i=0;i<comments.length;i++){
            var user = await request('http://localhost:3001/user/'+comments[i].author_id)
            user = JSON.parse(user)
            const {_id, ...rest} = comments[i]._doc
            results.push({author: user, ...rest, id: comments[i]._doc._id.toString()}) 
        }
        return results
    }
}
module.exports = resolvers