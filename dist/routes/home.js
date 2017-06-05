'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var routes = function routes(app) {
  // Home Route
  app.get('/', function (req, res) {
    res.render('home', { articles: '<h1>Hello World</h1>' });
  });
};

exports.default = routes;