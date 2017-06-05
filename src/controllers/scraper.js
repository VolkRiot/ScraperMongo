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
    const options = {
      uri: this.mainUrl,
      transform: body => this.cheerio.load(body),
    };
    return this.rp(options);
  }

  scrapeMain() {
    this.loadHTML().then(($) => {
      $('.esc-layout-article-cell').each((i, em) => {
        const $current = $(em);

        const title = $current.find('h2').text();
        const source = $current.find('.source-cell').text();
        const posted = $current.find('.timestamp-cell').text().substring(2);

        // TODO: Continue to code here dawg

        const article = {
          title,
          source,
          posted,
        };
        console.log('Article is ', article);
      });
    });
  }
}

export default Scraper;
