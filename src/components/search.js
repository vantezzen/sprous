/**
 * Search results
 */
import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import * as JsSearch from "js-search"

import Item from "../components/item"

class Search extends Component {
  state = {
    articles: [], // All articles
    search: {}, // JsSearch instance
    searchResults: [], // Current results
    isLoading: true,
    isError: false,
    searchQuery: "",
  }

  // Build index and search on mount
  componentDidMount() {
    this.rebuildIndex()
  }

  // Search on query update
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.searchData()
    }
  }

  // Rebuild index of availible data
  rebuildIndex = () => {
    const search = new JsSearch.Search("path")

    // Add indexes
    search.addIndex("html")
    search.addIndex(["frontmatter", "title"])
    search.addIndex(["frontmatter", "category"])

    // Prepare data
    const articles = this.props.data.articles.edges
    let items = []
    for (let article of articles) {
      const item = {
        ...article.node,
        path: article.node.frontmatter.path,
      }
      items.push(item)
    }

    // Add data to search
    search.addDocuments(items)

    // Update state and search for current query
    this.setState(
      { articles: items, search, isLoading: false },
      this.searchData
    )
  }

  // Search data using query
  searchData = () => {
    const { search } = this.state
    const queryResult = search.search(this.props.query)
    this.setState({ searchResults: queryResult })
  }

  render() {
    const { searchResults } = this.state
    return (
      <div style={{ marginTop: "2.5rem" }} data-testid="search-container">
        Found {searchResults.length} item
        {searchResults.length !== 1 && "s"}
        {searchResults.map(result => {
          // Render based on result type
          if (result.frontmatter.type === "category") {
            // Only return if showCategoriesInSearch is enabled
            return (
              this.props.data.config.siteMetadata.settings
                .showCategoriesInSearch && (
                // Render category as item
                <Item
                  icon={result.frontmatter.icon}
                  heading={result.frontmatter.title}
                  description={result.frontmatter.description}
                  info=""
                  link={result.frontmatter.path}
                  key={result.frontmatter.path}
                />
              )
            )
          } else if (result.frontmatter.type === "article") {
            return (
              // Render article as item
              <Item
                icon=""
                hideIcon={true}
                heading={result.frontmatter.title}
                description={result.excerpt}
                info=""
                link={result.frontmatter.path}
                key={result.frontmatter.path}
              />
            )
          } else {
            console.error(
              "Invalid type",
              result.frontmatter.type,
              "in file with title",
              result.frontmatter.title
            )
            return ""
          }
        })}
      </div>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query ArticlesAndSearchConfig {
        articles: allMarkdownRemark {
          edges {
            node {
              id
              html
              excerpt
              frontmatter {
                icon
                type
                title
                path
                category
                description
              }
            }
          }
        }

        config: site {
          siteMetadata {
            settings {
              showCategoriesInSearch
            }
          }
        }
      }
    `}
    render={data => <Search data={data} {...props} />}
  />
)
