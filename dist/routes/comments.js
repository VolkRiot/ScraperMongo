'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteComment = exports.saveComment = undefined;

var _Articles = require('../models/Articles');

var _Articles2 = _interopRequireDefault(_Articles);

var _Comments = require('../models/Comments');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
var saveComment = function saveComment(app) {
  app.post('/newcomment/:id', function (req, res) {
    var newComment = new _Comments2.default({ body: req.body.comment });

    newComment.save(function (err, resp) {
      if (err) {
        res.status(500).send('Could not save comment');
      } else {
        _Articles2.default.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: resp._id } }).exec(function (error) {
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

var deleteComment = function deleteComment(app) {
  app.delete('/delete/comment/:id', function (req, res) {
    _Comments2.default.findByIdAndRemove(req.params.id).then(function (deleted) {
      if (!deleted) {
        res.status(500).send('Server Error: Failed to remove this record');
      } else {
        res.json({ success: true });
      }
    });
  });
};

exports.saveComment = saveComment;
exports.deleteComment = deleteComment;