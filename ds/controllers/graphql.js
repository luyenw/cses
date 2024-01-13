const Comment = require("../schema/Comment");
const request = require("request-promise-native");

const resolvers = {
  createMessage: async ({ input }) => {
    try {
      const new_comment = new Comment({
        topic_id: input.topic_id,
        parent_id: input.parent_id,
        author_id: input.author_id,
        body: input.body,
      });
      await new_comment.save();
      const { _id, ...rest } = new_comment;
      const apiUrl = process.env.API_URL;
      console.log(apiUrl);
      var user = await request(`${apiUrl}:3001/users/` + input.author_id);
      user = JSON.parse(user);
      return {
        author: user,
        ...rest,
        body: input.body,
        createdAt: new Date(),
        id: _id.toString(),
      };
    } catch (err) {
      console.log(err);
      return { err };
    }
  },
  getComments: async ({ topic_id }) => {
    const comments = await Comment.find({ topic_id: topic_id, parent_id: "0" })
      .sort({ createdAt: "descending" })
      .exec();
    results = [];
    const apiUrl = process.env.API_URL;
    for (var i = 0; i < comments.length; i++) {
      var user = await request(`${apiUrl}:3001/users/` + comments[i].author_id);
      user = JSON.parse(user);
      const { _id, ...rest } = comments[i]._doc;
      results.push({
        author: user,
        ...rest,
        id: comments[i]._doc._id.toString(),
      });
    }
    return results;
  },
  commentReplies: async ({ comment_id }) => {
    results = [];
    try {
      const apiUrl = process.env.API_URL;
      const comments = await Comment.find({ parent_id: comment_id }).exec();
      for (var i = 0; i < comments.length; i++) {
        var user = await request(
          `${apiUrl}:3001/users/` + comments[i].author_id
        );
        user = JSON.parse(user);
        const { _id, ...rest } = comments[i]._doc;
        results.push({
          author: user,
          ...rest,
          id: comments[i]._doc._id.toString(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    return results;
  },
};
module.exports = resolvers;
