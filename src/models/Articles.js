import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
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
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  },
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
