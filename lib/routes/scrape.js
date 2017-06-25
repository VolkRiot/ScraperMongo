'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scraper = require('../controllers/scraper');

var _scraper2 = _interopRequireDefault(_scraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrapeRoute = function scrapeRoute(app) {
  app.get('/scrape', function (req, res) {
    var Scrape = new _scraper2.default();
    Scrape.scrapeMain().then(function (resp) {
      res.render('articles', { articles: resp });
    });
  });
};

exports.default = scrapeRoute;