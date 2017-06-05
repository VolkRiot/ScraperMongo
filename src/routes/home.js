const homeRoute = (app) => {
  // Home Route
  app.get('/', (req, res) => {
    res.render('home', { articles: '<h1>Hello World</h1>' });
  });
};

export default homeRoute;
