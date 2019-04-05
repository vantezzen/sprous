import React from "react"
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect'
import { StaticQuery, useStaticQuery } from 'gatsby'

import NotFoundPage from "./404"

beforeEach(() => {
  const info = {
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
    }
  };

  // StaticQuery mocks
  StaticQuery.mockImplementation(({ render }) => 
    render(info)
  )
  useStaticQuery.mockImplementation(() => info)
})

afterEach(cleanup)

it("renders correctly", () => {
  const { container, getByTestId, getByText } = render((
      <NotFoundPage />
  ));
  expect(container).toMatchSnapshot()

  expect(getByTestId('not-found-container')).toBeInTheDocument()
})