'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Articles = require('../models/Articles');

var _Articles2 = _interopRequireDefault(_Articles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveRoutes = function saveRoutes(app) {
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

exports.default = saveRoutes;