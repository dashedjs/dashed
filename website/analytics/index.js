const main = () => {
  // Load custom tracking code lazily, so it's non-blocking.
  // Replace `./analytics` with either of the following if using one of the
  // other variations:
  // - `./base.js`
  // - `./autotrack.js`
  // - `./multiple-trackers.js`
  import('./multiple-trackers.js').then(analytics => analytics.init());

  // Initate all other code paths here...
};

// Start the app through its main entry point.
main();
