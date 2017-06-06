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
    const newArticles = [];

    return new Promise((resolve, reject) => {
      this.loadHTML().then(($) => {
        $('.esc-layout-article-cell').each((i, em) => {
          const $current = $(em);

          const title = $current.find('h2').text();

          const source = $current.find('.source-cell').text();

          const posted = $current.find('.timestamp-cell').text().substring(2);

          const photoUrl = $current
            .siblings('.esc-layout-thumbnail-cell')
            .find('.esc-thumbnail-image')
            .attr('src');

          newArticles.push({
            title,
            source,
            posted,
            photoUrl,
          });
        });
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
}

export default Scraper;