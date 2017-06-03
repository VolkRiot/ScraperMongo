/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
// import mongoose from 'mongoose';
import path from 'path';
// import request from 'request';

const PORT = process.env.PORT || 8080;

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Static Routes
app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.static(path.join(__dirname, 'views/')));

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home', {});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
