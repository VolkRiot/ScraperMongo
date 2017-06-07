'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  source: {
    type: String,
    required: true
  },
  posted: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }]
});

var Article = _mongoose2.default.model('Article', ArticleSchema);

exports.default = Article;