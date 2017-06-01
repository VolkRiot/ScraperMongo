/* eslint-disable no-console */
// Compression?
import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Sample from '../client';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Testing basic template
app.get('/', (req, res) => {
  const newSample = React.createFactory(Sample);
  const markup = ReactDOMServer.renderToStaticMarkup(newSample({}));
  res.render('home', {
    markup,
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
