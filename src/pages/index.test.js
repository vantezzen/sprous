import React from "react"
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect'
import { StaticQuery, useStaticQuery } from 'gatsby'

import IndexPage from "./index"

// Sample data needed for index, navigation, icon
const data = {
  // General site metadata
  site: {
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
  },

  categories: {
    edges: [
      {
        node: {
          html: "",
          excerpt: "",
          frontmatter: {
            icon: "CreditCard",
            type: "article",
            title: "ONE",
            path: "one",
            description: "",
          },
        }
      },
      {
        node: {
          html: "",
          excerpt: "",
          frontmatter: {
            icon: "CreditCard",
            type: "article",
            title: "TWO",
            path: "two",
            description: "",
          },
        }
      },
    ]
  }
};

beforeEach(() => {
  // StaticQuery mocks
  StaticQuery.mockImplementation(({ render }) => 
    render(data)
  )
  useStaticQuery.mockImplementation(() => data)
})

afterEach(cleanup)

it("renders correctly", () => {
  const { container, getByTestId, getByText } = render((
      <IndexPage data={ data } />
  ));
  expect(container).toMatchSnapshot()

  // Expect two categories
  expect(container.querySelectorAll(`[data-testid="item-link"]`)).toHaveLength(2)
  expect(container.querySelectorAll(`[data-testid="item-heading"]`)[0]).toHaveTextContent('ONE')
  expect(container.querySelectorAll(`[data-testid="item-heading"]`)[1]).toHaveTextContent('TWO')
})