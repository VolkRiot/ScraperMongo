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
            res.json({ success: true, id: resp._id });
          }
        });
      }
    });
  });
};

const deleteComment = (app) => {
  app.delete('/delete/comment/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id).then((deleted) => {
      if (!deleted) {
        res.status(500).send('Server Error: Failed to remove this record');
      } else {
        res.json({ success: true });
      }
    });
  });
};

export { saveComment, deleteComment };
