import Articles from '../models/Articles';

const saveRoute = (app) => {
  app.post('/save', (req, res) => {
    const newArticle = new Articles(req.body);
    newArticle.save((err) => {
      if (err) {
        // Mongo Error code for duplicate record
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

const deleteArticles = (app) => {
  app.delete('/delete', (req, res) => {
    const id = req.body.id;
    Articles.findByIdAndRemove(id).then((deleted) => {
      if (!deleted) {
        res.status(500).send('Server Error: Failed to remove this record');
      } else {
        res.json({ success: true });
      }
    });
  });
};

export { saveRoute, savedArticles, deleteArticles };
