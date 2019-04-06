import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Navigation from "./navigation"
import "./layout.css"
import Search from "./search"
import Footer from "./footer"

import {
  ContentOuterContainer,
  ContentInnerContainer,
  SearchField,
} from "../styles/layout"

class Layout extends Component {
  state = {
    searchActive: false,
    searchQuery: "",
  }

  constructor(props) {
    super(props)

    this.handleSearchUpdate = this.handleSearchUpdate.bind(this)
  }

  handleSearchUpdate(e) {
    let searchActive = e.target.value !== ""

    this.setState({
      searchActive,
      searchQuery: e.target.value,
    })
  }

  render() {
    const { children, data } = this.props
    const showFooter =
      data.site.siteMetadata.settings.showPoweredBySprousAsFooter

    return (
      <>
        <Navigation data-testid="layout-navigation" />
        <ContentOuterContainer data-testid="layout-content-outer-container">
          <ContentInnerContainer data-testid="layout-content-inner-container">
            <SearchField
              type="text"
              placeholder="What can I help you with?"
              autoFocus
              onChange={this.handleSearchUpdate}
              value={this.state.searchQuery}
              data-testid="layout-search-field"
            />

            <main>
              {this.state.searchActive ? (
                <Search
                  query={this.state.searchQuery}
                  data-testid="layout-search-results"
                />
              ) : (
                children
              )}
            </main>
          </ContentInnerContainer>
        </ContentOuterContainer>
        {showFooter && <Footer />}
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            settings {
              showPoweredBySprousAsFooter
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)
