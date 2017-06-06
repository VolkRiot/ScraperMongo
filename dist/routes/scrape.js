'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scraper = require('../controllers/scraper');

var _scraper2 = _interopRequireDefault(_scraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScrapeRoute = function ScrapeRoute(app) {
  app.get('/scrape', function (req, res) {
    var Scrape = new _scraper2.default();
    Scrape.scrapeMain().then(function (resp) {
      // res.json(resp);
      res.render('articles', { articles: resp });
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

exports.default = ScrapeRoute;