/* eslint-disable */
import homeRoute from './home';
import scrapeRoute from './scrape';
import { saveRoute, savedArticles, deleteArticles } from './articles';
import { saveComment, deleteComment } from './comments';

const Routes = [
  homeRoute,
  scrapeRoute,
  saveRoute,
  savedArticles,
  deleteArticles,
  saveComment,
  deleteComment,
];

export default Routes;
