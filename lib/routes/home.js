'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var homeRoute = function homeRoute(app) {
  // Home Route
  app.get('/', function (req, res) {
    res.render('home', { articles: false });
  });
};

exports.default = homeRoute;