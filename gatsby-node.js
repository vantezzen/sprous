/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")

// Create category and article pages
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  // Get templates
  const articleTemplate = path.resolve(`src/templates/articleTemplate.js`)
  const categoryTemplate = path.resolve(`src/templates/categoryTemplate.js`)

  // Get all data
  return graphql(`
  {
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          id,
          frontmatter {
            type,
            title,
            path
          }
        }
      }
    }
  }
`).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // Render article page
      if (node.frontmatter.type === 'article') {
        createPage({
          path: node.frontmatter.path,
          component: articleTemplate,
          context: {
            article: node.frontmatter.path
          },
        })

      // Render category page
      } else if (node.frontmatter.type === 'category') {
        createPage({
          path: node.frontmatter.path,
          component: categoryTemplate,
          context: {
            category: node.frontmatter.path
          },
        })
      }
    })
  })
}