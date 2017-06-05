'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scraper = function () {
  function Scraper() {
    _classCallCheck(this, Scraper);

    this.request = _request2.default;
    this.cheerio = _cheerio2.default;
    this.mainUrl = 'https://news.google.com/';
    this.$ = undefined;
  }

  _createClass(Scraper, [{
    key: 'setURL',
    value: function setURL(url) {
      this.mainUrl = url;
    }
  }, {
    key: 'loadHTML',
    value: function loadHTML() {
      var _this = this;

      return new Promise(function (res) {
        _this.request(_this.mainURL, function (err, resp, html) {
          if (err) throw new Error('Request could not reach the page');
          _this.$ = _this.cheerio.load(html);
          res(_this.$);
        });
      });
    }
    // this.request(this.mainURL, (err, resp, html) => {
    //   if (err) throw new Error('Request could not reach the page');
    //   this.$ = this.cheerio.load(html);

  }, {
    key: 'scrapeMain',
    value: function scrapeMain() {
      this.loadHTML.then(function ($) {
        $('.esc-layout-article-cell').each(function (i, em) {
          var $current = $(em);

          var title = $current.find('h2').text();
          var source = $current.find('.source-cell').text();
          var posted = $current.find('.timestamp-cell').text().substring(2);

          var article = {
            title: title,
            source: source,
            posted: posted
          };

          console.log('Article is ', article);
        });
      });
    }
  }]);

  return Scraper;
}();

exports.default = Scraper;