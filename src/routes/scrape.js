import Scraper from '../controllers/scraper';

const ScrapeRoute = (app) => {
  app.get('/scrape', (req, res) => {
    const Scrape = new Scraper();
    Scrape.scrapeMain().then((resp) => {
      console.log(resp);
    });

    // Scrape.scrapeMain().then((articles) => {
    //   console.log("articles works?");
    // });

    // const articles = {
    //   articles: Scrape.scrapeMain().then((articles) {
    //     res.json(articles);
    //   }),
    // };

    // res.render('articles', articles);
  });
};

export default ScrapeRoute;
