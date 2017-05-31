'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _renderApp = require('./render-app');

var _renderApp2 = _interopRequireDefault(_renderApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import exphbs from 'express-handlebars';
/* eslint-disable no-console */
// Compression?
var PORT = process.env.PORT || 8080;

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/vnd.api+json' }));

// app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.get('/test', function (req, res) {
  res.send((0, _renderApp2.default)('My test template'));
});

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});