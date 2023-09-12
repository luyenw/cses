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
      const id = await new_comment.save()
      return id._id.toHexString()
    },
    getComments: async ({topic_id})=>{
        const comments = await Comment.find({topic_id: topic_id, parent_id: "0"}).exec()
        results = []
        for(var i=0;i<comments.length;i++){
            var user = await request('http://localhost:3001/user/'+comments[i].author_id)
            user = JSON.parse(user)
            results.push({author: user, ...comments[i]._doc}) 
        }
        return results
    },
    commentReplies: async ({comment_id})=>{
        const comments = await Comment.find({parent_id: comment_id}).exec()
        results = []
        for(var i=0;i<comments.length;i++){
            var user = await request('http://localhost:3001/user/'+comments[i].author_id)
            user = JSON.parse(user)
            results.push({author: user, ...comments[i]._doc}) 
        }
        return results
    }
}
module.exports = resolvers