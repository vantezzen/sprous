import React from "react"
import { render, fireEvent, cleanup } from "react-testing-library"
import "jest-dom/extend-expect"
import { StaticQuery, useStaticQuery } from "gatsby"

import Template from "./articleTemplate"

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

  article: {
    html: "<div>ARTICLE</div>",
    excerpt: "ARTICLE",
    frontmatter: {
      icon: "",
      type: "article",
      title: "ONE",
      path: "one",
      description: "",
    },
  },

  footer: {
    html: "<h1>FOOTER</h1>",
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

  // Test article content
  expect(getByTestId("article-content")).toBeInTheDocument()
  expect(getByTestId("article-content")).toContainHTML(data.article.html)

  // Test footer
  expect(getByTestId("article-footer")).toBeInTheDocument()
  expect(getByTestId("article-footer")).toContainHTML(data.footer.html)
})
it("hides the footer", () => {
  let customAnswer = clone(data)
  customAnswer.footer = null

  const { container, getByTestId, getByText } = render(
    <Template data={customAnswer} />
  )
  expect(container).toMatchSnapshot()

  expect(
    container.querySelector(`[data-testid="article-footer"]`)
  ).not.toBeInTheDocument()
})
