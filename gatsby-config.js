module.exports = {
  // START editing site settings
  siteMetadata: {
    title: `sprous`, // Title of the support website
    logoType: `combined`, // Logo shown in navigation bar, `text`, `image` or `combined`(i.e. show both)
    description: `Add a simple self-support system/knowledge base to your website using sprous.`,
    author: `@vantezzen`,

    settings: {
      showCategoriesInSearch: true,

      showPoweredBySprousAsFooter: true, // Show "Powered by sprous" link as footer to support the project
      // Feel free to disable if you do not want the footer

      showBTSLink: true, // Show "Back to service" (BTS) link in navigation bar
      BTSLinkTitle: "Back to GitHub", // Text shown inside the "Back to service" (BTS) link
      BTSLinkHref: "https://github.com/vantezzen/sprous", // Link location of the "Back to service" (BTS) link
    },
  },
  pathPrefix: `/sprous`,
  // STOP editing site settings unless you want to change gatsby configuration

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Help Center`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: "articles",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    `gatsby-transformer-remark`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
