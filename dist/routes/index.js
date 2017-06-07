'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _scrape = require('./scrape');

var _scrape2 = _interopRequireDefault(_scrape);

var _articles = require('./articles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = [_home2.default, _scrape2.default, _articles.saveRoute, _articles.savedArticles, _articles.deleteArticles]; /* eslint-disable */
exports.default = Routes;