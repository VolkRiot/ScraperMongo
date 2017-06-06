import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
