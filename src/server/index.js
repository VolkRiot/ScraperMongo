/* eslint-disable no-console */
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import compression from 'compression';
import mongoose from 'mongoose';
import path from 'path';
import Routes from '../routes';

mongoose.Promise = Promise;

const PORT = process.env.PORT || 8080;

const app = express();

mongoose.connect('mongodb://localhost/GNewsScraper');
const db = mongoose.connection;

// Show any mongoose errors
db.on('error', (error) => {
  console.log('Mongoose Error: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', () => {
  console.log('Mongoose connection successful.');
});

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

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
