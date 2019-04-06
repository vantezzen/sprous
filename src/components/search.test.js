import React from "react"
import { render, fireEvent, cleanup } from "react-testing-library"
import "jest-dom/extend-expect"
import { StaticQuery } from "gatsby"

const { toMatchDiffSnapshot } = require("snapshot-diff")
expect.extend({ toMatchDiffSnapshot })

import Search from "./search"

afterEach(cleanup)

// GraphQL answer expected from navigation and logo
const GraphQLAnswer = {
  // General site metadata
  config: {
    siteMetadata: {
      title: `sprous`, // Title of the support website
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
  },

  // Dummy articles
  articles: {
    edges: [
      {
        node: {
          html: "ONE EINS UNO ARTICLE",
          excerpt: "ONE EINS UNO ARTICLE",
          frontmatter: {
            icon: "CreditCard",
            type: "article",
            title: "TITLE",
            path: "FIRST",
            category: "FIRST CATERGORY",
            description: "DESCRIPTION",
          },
        },
      },
      {
        node: {
          html: "TWO ZWEI DUO ARTICLE",
          excerpt: "TWO ZWEI DUO ARTICLE",
          frontmatter: {
            icon: "CreditCard",
            type: "article",
            title: "TITLE",
            path: "SECOND",
            category: "SECOND CATERGORY",
            description: "DESCRIPTION",
          },
        },
      },
    ],
  },
}

it("renders correctly", () => {
  StaticQuery.mockImplementation(({ render }) => render(GraphQLAnswer))

  const { container, getByTestId, getByText } = render(<Search />)
  expect(container).toMatchSnapshot()

  expect(
    container.querySelector(`[data-testid="search-container"]`)
  ).toBeInTheDocument()
})

it("searches single articles", () => {
  StaticQuery.mockImplementation(({ render }) => render(GraphQLAnswer))

  let { container, getByTestId, getByText } = render(<Search query="one" />)
  expect(container).toMatchSnapshot()

  // Expect 1 result
  expect(container.querySelectorAll(`[data-testid="item-link"]`)).toHaveLength(
    1
  )
})

it("searches multiple articles", () => {
  StaticQuery.mockImplementation(({ render }) => render(GraphQLAnswer))

  let { container, getByTestId, getByText } = render(<Search query="article" />)
  expect(container).toMatchSnapshot()

  // Expect 2 result
  expect(container.querySelectorAll(`[data-testid="item-link"]`)).toHaveLength(
    2
  )
})
