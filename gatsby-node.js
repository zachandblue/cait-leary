const path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                title
              }
            }
          }
          allWordpressPost {
            edges {
              node {
                id
                slug
                title
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }
      result.data.allWordpressPage.edges.forEach(({ node }) => {
        if (node.slug === "contact") {
          createPage({
            path: node.slug,
            component: path.resolve("./src/templates/page.js"),
            context: {
              slug: node.slug,
            },
          });
        } else if (node.slug === "the-bad") {
          createPage({
            path: `${node.slug}`,
            component: path.resolve("./src/templates/the-bad.js"),
            context: {
              slug: node.slug,
            },
          });
        }
      });
      result.data.allWordpressPost.edges.forEach(({ node }) => {
        createPage({
          path: `posts/${node.slug}`,
          component: path.resolve("./src/templates/post.js"),
          context: {
            slug: node.slug,
          },
        });
      });

      resolve();
    });
  });
};
