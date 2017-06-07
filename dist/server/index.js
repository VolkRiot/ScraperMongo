'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
_mongoose2.default.Promise = Promise;

var PORT = process.env.PORT || 8080;

var app = (0, _express2.default)();

_mongoose2.default.connect('mongodb://localhost/GNewsScraper');
var db = _mongoose2.default.connection;

// Show any mongoose errors
db.on('error', function (error) {
  console.log('Mongoose Error: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function () {
  console.log('Mongoose connection successful.');
});

// Body Parser Middleware
app.use((0, _compression2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/vnd.api+json' }));

// Static Routes
app.use(_express2.default.static(_path2.default.join(__dirname, '../../public')));
app.use(_express2.default.static(_path2.default.join(__dirname, '../../views')));

// Set-up View Engine
app.engine('hbs', (0, _expressHandlebars2.default)({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    stringify: function stringify(obj) {
      return JSON.stringify(obj);
    }
  }
}));
app.set('view engine', 'hbs');

// Get routes path
_routes2.default.forEach(function (route) {
  route(app);
});

process.on('SIGINT', function () {
  _mongoose2.default.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});