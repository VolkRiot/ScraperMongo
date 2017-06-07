'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedArticles = exports.saveRoute = undefined;

var _Articles = require('../models/Articles');

var _Articles2 = _interopRequireDefault(_Articles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveRoute = function saveRoute(app) {
  app.post('/save', function (req, res) {
    var newArticle = new _Articles2.default(req.body);
    newArticle.save(function (err) {
      if (err) {
        if (err.code === 11000) {
          res.json({ duplicate: true });
        } else {
          res.status(500).send('Server error: Could not save article');
        }
      } else {
        res.json({ success: true });
      }
    });
  });
};

var savedArticles = function savedArticles(app) {
  app.get('/saved', function (req, res) {
    _Articles2.default.find({}).then(function (resp, err) {
      if (err) {
        res.status(500).send('Server error: Could not retrieve articles');
      } else {
        res.render('saved', { articles: resp });
      }
    });
  });
};

exports.saveRoute = saveRoute;
exports.savedArticles = savedArticles;