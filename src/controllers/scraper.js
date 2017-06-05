import cheerio from 'cheerio';
import request from 'request';

class Scraper {
  constructor() {
    this.request = request;
    this.cheerio = cheerio;
    this.mainUrl = 'https://news.google.com/';
    this.$ = undefined;
  }

  setURL(url) {
    this.mainUrl = url;
  }

  loadHTML() {
    return new Promise((res) => {
      this.request(this.mainURL, (err, resp, html) => {
        if (err) throw new Error('Request could not reach the page');
        this.$ = this.cheerio.load(html);
        res(this.$);
      });
    });
  }
  // this.request(this.mainURL, (err, resp, html) => {
  //   if (err) throw new Error('Request could not reach the page');
  //   this.$ = this.cheerio.load(html);

  scrapeMain() {
    this.loadHTML.then(($) => {
      $('.esc-layout-article-cell').each((i, em) => {
        const $current = $(em);

        const title = $current.find('h2').text();
        const source = $current.find('.source-cell').text();
        const posted = $current.find('.timestamp-cell').text().substring(2);

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
