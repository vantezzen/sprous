import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Item from "../components/item"

export default function IndexPage({ data }) {
  const categories = data.categories.edges;

  return (
    <Layout>
      <SEO title="Home" keywords={[`support`, `help center`, `knowledge base`]} />

      {
        categories.map(category => (
          // Render categories using Item component
          <Item 
              icon={ category.node.frontmatter.icon }
              heading={ category.node.frontmatter.title } 
              description={ category.node.frontmatter.description } 
              info=""
              link={ category.node.frontmatter.path }
              key={ category.node.frontmatter.path } />
        ))
      }
    </Layout>
  );
}

// Get all categories
export const pageQuery = graphql`
query Categories {
    categories: allMarkdownRemark(filter: { frontmatter: { type: { eq: "category" } } } limit: 1000) {
    edges {
      node {
        id,
        html,
        frontmatter {
          title,
          path,
          icon,
          description
        }
      }
    }
  }
}
`