'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
var PORT = process.env.PORT || 8080;

var app = (0, _express2.default)();

// Body Parser Middleware
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/vnd.api+json' }));

// Static Routes
app.use(_express2.default.static(_path2.default.join(__dirname, 'public/')));
app.use(_express2.default.static(_path2.default.join(__dirname, 'views/')));

app.engine('hbs', (0, _expressHandlebars2.default)({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('main', {});
});

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});