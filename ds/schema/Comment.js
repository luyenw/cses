const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CommentSchema = new Schema({
    id: String,
    topic_id: Number,
    parent_id: String, 
    author_id: Number,
    body: String
}, {
    timestamps: true
})

const Comment = mongoose.model('comment', CommentSchema, 'comments')
module.exports = Comment