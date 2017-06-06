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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mongoose from 'mongoose';
var PORT = process.env.PORT || 8080; /* eslint-disable no-console */


var app = (0, _express2.default)();

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
app.engine('hbs', (0, _expressHandlebars2.default)({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Get routes path
_routes2.default.forEach(function (route) {
  route(app);
});

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});