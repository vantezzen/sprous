/**
 * Template for rendering article pages
 */
import React from "react"
import { graphql } from "gatsby"
import { HelpCircle } from "react-feather"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { ItemNoFlex } from "../styles/item"
import {
  ArticleHeading,
  ArticleContent,
  ArticleHelpCircle,
} from "../styles/article"

export default function Template({ data }) {
  const { article, footer } = data

  // Get article data
  const { frontmatter, html } = article

  return (
    <Layout>
      <SEO title={frontmatter.title} />

      <div style={{ marginTop: "2.5rem" }}>
        <ItemNoFlex>
          <ArticleHeading>
            <HelpCircle style={ArticleHelpCircle} width="100%" height="100%" />
            {frontmatter.title}
          </ArticleHeading>
          <ArticleContent
            dangerouslySetInnerHTML={{ __html: html }}
            className="markdown-content"
            data-testid="article-content"
          />
          {footer != null && (
            <ArticleContent
              dangerouslySetInnerHTML={{ __html: footer.html }}
              className="markdown-content footer"
              data-testid="article-footer"
            />
          )}
        </ItemNoFlex>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($article: String!) {
    article: markdownRemark(frontmatter: { path: { eq: $article } }) {
      html
      frontmatter {
        path
        title
      }
    }

    footer: markdownRemark(frontmatter: { type: { eq: "footer" } }) {
      html
    }
  }
`
