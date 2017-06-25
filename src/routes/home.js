const homeRoute = (app) => {
  // Home Route
  app.get('/', (req, res) => {
    res.render('home', { articles: false });
  });
};

export default homeRoute;
