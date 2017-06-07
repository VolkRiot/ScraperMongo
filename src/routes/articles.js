import Articles from '../models/Articles';

const saveRoute = (app) => {
  app.post('/save', (req, res) => {
    const newArticle = new Articles(req.body);
    newArticle.save((err) => {
      if (err) {
        if (err.code === 11000) {
          res.json({ duplicate: true });
        } else {
          res.status(500).send('Server error: Could not save article');
        }
      } else {
        res.json({ success: true });
      }
    });
  });
};

const savedArticles = (app) => {
  app.get('/saved', (req, res) => {
    Articles.find({}).then((resp, err) => {
      if (err) {
        res.status(500).send('Server error: Could not retrieve articles');
      } else {
        res.render('saved', { articles: resp });
      }
    });
  });
};

export { saveRoute, savedArticles };
