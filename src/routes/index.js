/* eslint-disable */
import homeRoute from './home';
import scrapeRoute from './scrape';
import { saveRoute, savedArticles, deleteArticles } from './articles';
import { saveComment } from './comments';

const Routes = [homeRoute, scrapeRoute, saveRoute, savedArticles, deleteArticles, saveComment];

export default Routes;
