'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 8080;
//import exphbs from 'express-handlebars';
/* eslint-disable no-console */
// Compression?


var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/vnd.api+json' }));

// app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// app.get('/test', (req, res) => {
//   console.log('Route hit');
// });

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});