/* eslint-disable no-console */
// Compression?
import express from 'express';
import bodyParser from 'body-parser';
// import exphbs from 'express-handlebars';
import path from 'path';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/test', (req, res) => {
//   console.log('Route hit');
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
