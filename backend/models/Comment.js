const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    postsId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
