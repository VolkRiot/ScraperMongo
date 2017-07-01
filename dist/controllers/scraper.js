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

      // Load URL from request w/ promise
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

      // Scrape for new Articles in news.google.com
      var newArticles = [];

      return new Promise(function (resolve, reject) {
        // Use promise from request promise to parse with cheerio
        // TODO: (Add catch here)
        _this2.loadHTML().then(function ($) {
          $('.qx0yFc').each(function (i, em) {
            var skip = false;
            var $current = $(this);
            var $thumbnail = $current.find('.lmFAjc');

            // Scrape for objects or whatever
            var title = $current.find('.nuEeue').text();
            var link = $current.find('.nuEeue').attr('href');
            var source = $current.find('.IH8C7b').html();
            var posted = $current.find('.d5kXP').html();
            var photoUrl = $thumbnail.attr('src');

            // Multiple possible sources of img URL check for alternatives
            if (photoUrl === undefined) {
              skip = true;
            }

            // If no reliable img source found skip the article for rendering continuity
            if (skip === false) {
              newArticles.push({
                title: title,
                link: link,
                source: source,
                posted: posted,
                photoUrl: photoUrl
              });
            }
          });

          // Resolve promise for use in Routes
          if (newArticles) {
            resolve(newArticles);
          } else {
            reject();
          }
        });
      });
    }
  }]);

  return Scraper;
}();

exports.default = Scraper;