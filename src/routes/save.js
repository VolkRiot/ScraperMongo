import Articles from '../models/Articles';

const saveRoutes = (app) => {
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

export default saveRoutes;
