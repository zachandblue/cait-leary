module.exports = {
  siteMetadata: {
    title: `Cait Leary`,
    description: `Nashville based Singer-Songwriter Cait Leary`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "myNodes",
        imagePath: "path.to.image",
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: "http://www.zachandbluebackend.com/bandpage",
        protocol: "http",
        hostingWPCOM: false,
        useACF: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/Favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
