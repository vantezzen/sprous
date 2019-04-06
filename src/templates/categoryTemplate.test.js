import React from "react"
import { render, fireEvent, cleanup } from "react-testing-library"
import "jest-dom/extend-expect"
import { StaticQuery, useStaticQuery } from "gatsby"

import Template from "./categoryTemplate"

// Sample data needed for template, navigation and icon
const data = {
  // General site metadata
  site: {
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

  // Image used in Navbar logo
  placeholderImage: {
    childImageSharp: {
      fluid: {
        src: "",
        srcSet: "",
        sizes: "",
        aspectRatio: 2,
      },
    },
  },

  // Current category
  category: {
    html: "",
    frontmatter: {
      path: "category",
      title: "CATEGORY",
      icon: "CreditCard",
    },
  },

  // Articles in category
  articles: {
    edges: [
      {
        node: {
          html: "ONE ARTICLE",
          excerpt: "ARTICLE",
          frontmatter: {
            type: "article",
            title: "ONE ARTICLE",
            path: "one",
            description: "",
          },
        },
      },
      {
        node: {
          html: "SECOND ARTICLE",
          excerpt: "second article",
          frontmatter: {
            type: "article",
            title: "TWO",
            path: "two",
            description: "",
          },
        },
      },
    ],
  },
}

const clone = input => {
  return JSON.parse(JSON.stringify(input))
}

beforeEach(() => {
  // StaticQuery mocks
  StaticQuery.mockImplementation(({ render }) => render(data))
  useStaticQuery.mockImplementation(() => data)
})

afterEach(cleanup)

it("renders correctly", () => {
  const { container, getByTestId, getByText } = render(<Template data={data} />)
  expect(container).toMatchSnapshot()

  // Test article list
  expect(container.querySelectorAll(`[data-testid="item-link"]`)).toHaveLength(
    2
  )
})
