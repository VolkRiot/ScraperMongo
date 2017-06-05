import Scraper from '../controllers/scraper';

const ScrapeRoute = (app) => {
  app.get('/scrape', (req, res) => {
    const Scrape = new Scraper();
    Scrape.scrapeMain();
  });
};

export default ScrapeRoute;
