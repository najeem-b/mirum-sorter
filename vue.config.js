// vue.config.js
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          // Prerender static pages
          new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, '/dist'),
            routes: ['/', '/about'],
            minify: {
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              decodeEntities: true,
              keepClosingSlash: true,
              sortAttributes: true,
            },
            renderer: new Renderer({
              headless: true,
              renderAfterDocumentEvent: 'render-event',
              maxConcurrentRoutes: 4,
            })
          }),
        ],
      };
    }
  },
}
