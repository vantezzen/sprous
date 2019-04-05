import React from "react"
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect'
import { StaticQuery } from 'gatsby'

const { toMatchDiffSnapshot } = require('snapshot-diff');
expect.extend({ toMatchDiffSnapshot });

import Navigation from "./navigation"

afterEach(cleanup)

// GraphQL answer expected from navigation and logo
const GraphQLAnswer = {
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

  // Image used in logo
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
const clone = (input) => {
  return JSON.parse(JSON.stringify(input));
}


it("renders correctly", () => {
  StaticQuery.mockImplementation(({ render }) => 
    render(GraphQLAnswer)
  )

  const { container, getByTestId, getByText } = render((
      <Navigation />
  ));
  expect(container).toMatchSnapshot()

  expect(getByTestId('navigation-text-logo')).toHaveTextContent(
    GraphQLAnswer.site.siteMetadata.title
  )
})

it("hides BTS link", () => {
  // Mock StaticQuery
  let customAnswer = clone(GraphQLAnswer);
  customAnswer.site.siteMetadata.settings.showBTSLink = false;
  StaticQuery.mockImplementation(({ render }) => 
    render(customAnswer)
  )

  // Render
  const { container, getByTestId, getByText } = render((
      <Navigation />
  ));

  expect(container).toMatchSnapshot()
  expect(container.querySelector(`[data-testid="navigation-bts-link"]`)).not.toBeInTheDocument()
})

it("uses BTS link config", () => {
  // Mock StaticQuery with custom BTS config
  let customAnswer = clone(GraphQLAnswer);
  customAnswer.site.siteMetadata.settings.BTSLinkTitle = "CUSTOM TITLE";
  customAnswer.site.siteMetadata.settings.BTSLinkHref = "CUSTOM_HREF";
  StaticQuery.mockImplementation(({ render }) => 
    render(customAnswer)
  )

  // Render
  const { container, getByTestId, getByText } = render((
      <Navigation />
  ));

  expect(container).toMatchSnapshot()
  expect(getByTestId('navigation-bts-link')).toBeInTheDocument()
  expect(getByTestId('navigation-bts-link')).toHaveTextContent("CUSTOM TITLE")
  expect(getByTestId('navigation-bts-link')).toHaveAttribute("href", "CUSTOM_HREF")
})

it ('uses uses text logo', () => {
  // Mock StaticQuery with custom BTS config
  let customAnswer = clone(GraphQLAnswer);
  customAnswer.site.siteMetadata.title = 'CUSTOM TEXT LOGO';
  customAnswer.site.siteMetadata.logoType = 'text';
  StaticQuery.mockImplementation(({ render }) => 
    render(customAnswer)
  )

  // Render
  const { container, getByTestId, getByText } = render((
      <Navigation />
  ));

  expect(container).toMatchSnapshot()
  expect(getByTestId('navigation-text-logo')).toBeInTheDocument()
  expect(getByTestId('navigation-text-logo')).toHaveTextContent('CUSTOM TEXT LOGO')
  expect(container.querySelector(`picture`)).not.toBeInTheDocument()
})

it ('uses uses image logo', () => {
  // Mock StaticQuery with custom BTS config
  let customAnswer = clone(GraphQLAnswer);
  customAnswer.site.siteMetadata.logoType = 'image';
  StaticQuery.mockImplementation(({ render }) => 
    render(customAnswer)
  )

  // Render
  const { container, getByTestId, getByText } = render((
      <Navigation />
  ));

  expect(container).toMatchSnapshot()
  expect(container.querySelector(`[data-testid="navigation-text-logo"]`)).not.toBeInTheDocument()
  expect(container.querySelector(`picture`)).toBeInTheDocument()
})

it ('uses uses combined logo', () => {
  // Mock StaticQuery with custom BTS config
  let customAnswer = clone(GraphQLAnswer);
  customAnswer.site.siteMetadata.logoType = 'combined';
  StaticQuery.mockImplementation(({ render }) => 
    render(customAnswer)
  )

  // Render
  const { container, getByTestId, getByText } = render((
      <Navigation />
  ));

  expect(container).toMatchSnapshot()
  expect(getByTestId('navigation-text-logo')).toBeInTheDocument()
  expect(getByTestId('navigation-text-logo')).toHaveTextContent(
    customAnswer.site.siteMetadata.title
  )  
  expect(container.querySelector(`picture`)).toBeInTheDocument()
})