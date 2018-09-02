module.exports = {
  staticFileGlobs: ['manifest.json', 'img/*', 'src/**/*'],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    },
    {
      urlPattern: /\/data\//,
      handler: 'fastest'
    }
  ]
};
