/* eslint-disable no-underscore-dangle */
import Articles from '../models/Articles';
import Comment from '../models/Comments';

const saveComment = (app) => {
  app.post('/newcomment/:id', (req, res) => {
    const newComment = new Comment({ body: req.body.comment });

    newComment.save((err, resp) => {
      if (err) {
        res.status(500).send('Could not save comment');
      } else {
        Articles.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: resp._id } },
        ).exec((error) => {
          if (error) {
            res.status(500).send('Error happens');
          } else {
            res.json({ success: true });
          }
        });
      }
    });
  });
};

export { saveComment };
