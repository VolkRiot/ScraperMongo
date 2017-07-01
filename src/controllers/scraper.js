import cheerio from 'cheerio';
import request from 'request-promise';

class Scraper {
  constructor() {
    this.rp = request;
    this.cheerio = cheerio;
    this.mainUrl = 'https://news.google.com/';
    this.$ = undefined;
  }

  setURL(url) {
    this.mainUrl = url;
  }

  loadHTML() {
    // Load URL from request w/ promise
    const options = {
      uri: this.mainUrl,
      transform: body => this.cheerio.load(body)
    };
    return this.rp(options);
  }

  scrapeMain() {
    // Scrape for new Articles in news.google.com
    const newArticles = [];

    return new Promise((resolve, reject) => {
      // Use promise from request promise to parse with cheerio
      // TODO: (Add catch here)
      this.loadHTML().then($ => {
        $('.qx0yFc').each(function(i, em) {
          let skip = false;
          const $current = $(this);
          const $thumbnail = $current.find('.lmFAjc');

          // Scrape for objects or whatever
          const title = $current.find('.nuEeue').text();
          const link = $current.find('.nuEeue').attr('href');
          const source = $current.find('.IH8C7b').html();
          const posted = $current.find('.d5kXP').html();
          let photoUrl = $thumbnail.attr('src');

          // Multiple possible sources of img URL check for alternatives
          if (photoUrl === undefined) {
            skip = true;
          }

          // If no reliable img source found skip the article for rendering continuity
          if (skip === false) {
            newArticles.push({
              title,
              link,
              source,
              posted,
              photoUrl
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
}

export default Scraper;
