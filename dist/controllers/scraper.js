'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scraper = function () {
  function Scraper() {
    _classCallCheck(this, Scraper);

    this.rp = _requestPromise2.default;
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

      var options = {
        uri: this.mainUrl,
        transform: function transform(body) {
          return _this.cheerio.load(body);
        }
      };

      return this.rp(options);

      // return new Promise((res, rej) => {
      //   this.rp(this.mainURL, (err, resp, html) => {
      //     console.log('And here?');
      //     if (err) rej();
      //     if (html) {
      //       this.$ = this.cheerio.load(html);
      //       res('this.$');
      //     }
      //   });
      // });
    }
    // this.rp(this.mainURL, (err, resp, html) => {
    //   if (err) throw new Error('Request could not reach the page');
    //   this.$ = this.cheerio.load(html);

  }, {
    key: 'scrapeMain',
    value: function scrapeMain() {
      this.loadHTML().then(function ($) {
        console.log('Did we maker it?');
      });

      // this.loadHTML().then(($) => {
      //   $('.esc-layout-article-cell').each((i, em) => {
      //     const $current = $(em);
      //
      //     const title = $current.find('h2').text();
      //     const source = $current.find('.source-cell').text();
      //     const posted = $current.find('.timestamp-cell').text().substring(2);
      //
      //     const article = {
      //       title,
      //       source,
      //       posted,
      //     };
      //
      //     console.log('Article is ', article);
      //   });
      // });
    }
  }]);

  return Scraper;
}();

exports.default = Scraper;