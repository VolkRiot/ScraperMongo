'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
app.engine('handlebars', (0, _expressHandlebars2.default)({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Testing basic template
app.get('/', function (req, res) {
  //let newSample = React.createFactory(Sample);
  var markup = _server2.default.renderToStaticMarkup(newSample);
  res.send('home', {
    markup: markup
  });
});

/*

var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = React.createFactory(require('./components/TweetsApp.react')),

index: function(req, res) {
    // Call static model method to get tweets in the db
    Tweet.getTweets(0,0, function(tweets, pages) {

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderToString(
        TweetsApp({
          tweets: tweets
        })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  },
*/

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});