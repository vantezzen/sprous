/**
 * Template for rendering category pages
 */
import React from "react"
import { graphql } from "gatsby"

import getIconComponent from '../utils/getIconComponent'

import Layout from '../components/layout'
import Item from '../components/item'
import SEO from '../components/seo'

import {
  CategoryHeading
} from '../styles/category'

export default function Template({ data }) {
  // Get category data
  const { category, articles } = data
  const { frontmatter, html } = category
  const articlesInCategory = articles.edges;

  // Get category icon
  const Icon = getIconComponent(frontmatter.icon);

  return (
    <Layout>
      <SEO title={frontmatter.title} />

      <div style={{ marginTop: '2.5rem' }}>
        <CategoryHeading>
          <Icon style={{ width: '2.5rem', marginRight: '1rem', color: '#3d4852' }} width="100%" height="100%" />
          {frontmatter.title}
        </CategoryHeading>
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {
          articlesInCategory.map(article => (
            <Item 
              icon='' 
              hideIcon={ true }
              heading={ article.node.frontmatter.title } 
              description={ article.node.excerpt } 
              info=""
              link={ article.node.frontmatter.path }
              key={ article.node.frontmatter.path } />
          ))
        }
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
query($category: String!) {
  category: markdownRemark(frontmatter: { path: { eq: $category } }) {
    html
    frontmatter {
      path
      title
      icon
    }
  }
  articles: allMarkdownRemark(filter: { frontmatter: { category: { eq: $category } } } limit: 1000) {
    edges {
      node {
        id,
        excerpt,
        frontmatter {
          title,
          path
        }
      }
    }
  }
}
`