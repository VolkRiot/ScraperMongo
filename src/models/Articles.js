import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  // Some Type of Schema will go here
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
