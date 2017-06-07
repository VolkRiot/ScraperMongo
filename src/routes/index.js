/* eslint-disable */
import homeRoute from './home';
import scrapeRoute from './scrape';
import { saveRoute, savedArticles, deleteArticles } from './articles';

const Routes = [homeRoute, scrapeRoute, saveRoute, savedArticles, deleteArticles];

export default Routes;
