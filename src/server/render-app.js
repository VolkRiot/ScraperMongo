const renderApp = title =>
  `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <div class="main-app"></div>
  </body>
</html>
`;

export default renderApp;
