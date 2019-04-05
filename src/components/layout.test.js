import React from "react"
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect'
import { StaticQuery } from 'gatsby'

const { toMatchDiffSnapshot } = require('snapshot-diff');
expect.extend({ toMatchDiffSnapshot });

import Layout from "./layout"

beforeEach(() => {
  const site =  {
    siteMetadata: {
      title: `sprous`,  // Title of the support website
      logoType: `combined`, // Logo shown in navigation bar, `text`, `image` or `combined`
      description: `Add a simple self-support system/knowledge base to your website using sprous.`,
      author: `@vantezzen`,
      
      settings: {
        showCategoriesInSearch: true,
    
        showBTSLink: true, // Show "Back to [service]" (BTS) link in navigation bar
        BTSLinkTitle: "Back to GitHub", // Text shown inside the "Back to [service]" (BTS) link
        BTSLinkHref: "https://github.com/vantezzen/sprous", // Link location of the "Back to [service]" (BTS) link
      },
    },
  };



  // StaticQuery mocks
  StaticQuery.mockImplementation(({ render }) => 
    render({
      // General site metadata
      site,

      // Article list used in search
      articles: {
        edges: [
          {
            node: {
              html: "<div></div>",
              excerpt: "excerpt",
              frontmatter: {
                icon: "CreditCard",
                type: "article",
                title: "TITLE",
                path: "PATH",
                category: "CATEGORY",
                description: "DESCRIPTION",
              },
            }
          }
        ]
      },

      // Image used in Navbar logo
      placeholderImage: {
        childImageSharp: {
          fluid: {
            src: '',
            srcSet: '',
            sizes: '',
            aspectRatio: 2
          }
        }
      }
    })
  )
})

afterEach(cleanup)

it("renders correctly", () => {
  const { container, getByTestId, getByText } = render((
      <Layout>
        <div data-testid="layout-content" />
      </Layout>
  ));
  expect(container).toMatchSnapshot()

  // Test content
  expect(getByTestId('layout-content')).toBeInTheDocument()

  // Test layout components
  expect(container.querySelector(`nav`)).toBeInTheDocument()
  expect(getByTestId('layout-content-outer-container')).toBeInTheDocument()
  expect(getByTestId('layout-content-inner-container')).toBeInTheDocument()
  expect(getByTestId('layout-search-field')).toBeInTheDocument()
  expect(container.querySelector(`[data-testid="layout-search-results"]`)).not.toBeInTheDocument()
})

it("switches to search results", () => {
  const { container, getByTestId, asFragment } = render((
      <Layout>
        <div data-testid="layout-content" />
      </Layout>
  ));

  // Get current render for reference
  const firstRender = asFragment()
  
  // Fire search query input
  fireEvent.change(getByTestId('layout-search-field'), { target: { value: 'b' } })

  // Test that search results get shown
  expect(firstRender).toMatchDiffSnapshot(asFragment())
  expect(container.querySelector(`[data-testid="layout-content"]`)).not.toBeInTheDocument()
})