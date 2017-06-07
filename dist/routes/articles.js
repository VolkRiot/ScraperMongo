'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteArticles = exports.savedArticles = exports.saveRoute = undefined;

var _Articles = require('../models/Articles');

var _Articles2 = _interopRequireDefault(_Articles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveRoute = function saveRoute(app) {
  app.post('/save', function (req, res) {
    var newArticle = new _Articles2.default(req.body);
    newArticle.save(function (err) {
      if (err) {
        // Mongo Error code for duplicate record
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
    _Articles2.default.find({}).populate('comments').exec(function (resp, err) {
      if (err) {
        res.status(500).send('Server error: Could not retrieve articles');
      } else {
        res.render('saved', { articles: resp });
      }
    });
  });
};

var deleteArticles = function deleteArticles(app) {
  app.delete('/delete', function (req, res) {
    var id = req.body.id;
    _Articles2.default.findByIdAndRemove(id).then(function (deleted) {
      if (!deleted) {
        res.status(500).send('Server Error: Failed to remove this record');
      } else {
        res.json({ success: true });
      }
    });
  });
};

exports.saveRoute = saveRoute;
exports.savedArticles = savedArticles;
exports.deleteArticles = deleteArticles;