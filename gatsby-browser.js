/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.onRouteUpdate = () => {
  console.log("route update", document.referrer);
  //   window.locations = window.locations || [document.referrer];
  //   locations.push(window.location.href);
  //   window.previousPath = locations[locations.length - 2];
  window.previousPath = "asdf";
};

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};
