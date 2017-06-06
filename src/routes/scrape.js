import Scraper from '../controllers/scraper';

const ScrapeRoute = (app) => {
  app.get('/scrape', (req, res) => {
    const Scrape = new Scraper();

    const articles = {
      articles: Scrape.scrapeMain(),
    };

    res.render('home', articles);
  });
};

export default ScrapeRoute;
