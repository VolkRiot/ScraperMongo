/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import path from 'path';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', {});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
