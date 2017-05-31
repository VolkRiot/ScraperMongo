"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var renderApp = function renderApp(title) {
  return "<!doctype html>\n<html>\n  <head>\n    <title>" + title + "</title>\n    <link rel=\"stylesheet\" href=\"/css/style.css\">\n  </head>\n  <body>\n    <div class=\"main-app\"></div>\n  </body>\n</html>\n";
};

exports.default = renderApp;