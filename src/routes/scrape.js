import Scraper from '../controllers/scraper';

const scrapeRoute = (app) => {
  app.get('/scrape', (req, res) => {
    const Scrape = new Scraper();
    Scrape.scrapeMain().then((resp) => {
      res.render('articles', { articles: resp });
    });
  });
};

export default scrapeRoute;
