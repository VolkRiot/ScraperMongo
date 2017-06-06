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
    }
  }, {
    key: 'scrapeMain',
    value: function scrapeMain() {
      var _this2 = this;

      var newArticles = [];

      return new Promise(function (resolve, reject) {

        _this2.loadHTML().then(function ($) {
          newArticles = $('.esc-layout-article-cell').each(function (i, em) {
            var $current = $(em);

            var title = $current.find('h2').text();

            var source = $current.find('.source-cell').text();

            var posted = $current.find('.timestamp-cell').text().substring(2);

            var photoUrl = $current.siblings('.esc-layout-thumbnail-cell').find('.esc-thumbnail-image').attr('src');

            newArticles.push({
              title: title,
              source: source,
              posted: posted,
              photoUrl: photoUrl
            });
          });
          console.log(newArticles);
          resolve(newArticles);
        });
      });

      // this.loadHTML().then(($) => {
      //   newArticles = $('.esc-layout-article-cell').map((i, em) => {
      //     const $current = $(em);
      //
      //     const title = $current.find('h2').text();
      //
      //     const source = $current.find('.source-cell').text();
      //
      //     const posted = $current.find('.timestamp-cell').text().substring(2);
      //
      //     const photoUrl = $current
      //       .siblings('.esc-layout-thumbnail-cell')
      //       .find('.esc-thumbnail-image')
      //       .attr('src');
      //
      //     return {
      //       title,
      //       source,
      //       posted,
      //       photoUrl,
      //     };
      //   });
      // });

    }
  }]);

  return Scraper;
}();

exports.default = Scraper;