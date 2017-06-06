/* eslint-disable no-console */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import compression from 'compression';
// import mongoose from 'mongoose';
import path from 'path';
import Routes from '../routes';

const PORT = process.env.PORT || 8080;

const app = express();

// Body Parser Middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Static Routes
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../views')));

// Set-up View Engine
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      stringify(obj) {
        return JSON.stringify(obj);
      },
    },
  }),
);
app.set('view engine', 'hbs');

// Get routes path
Routes.forEach((route) => {
  route(app);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
