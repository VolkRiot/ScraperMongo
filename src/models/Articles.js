import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  source: {
    type: String,
    required: true,
  },
  posted: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
