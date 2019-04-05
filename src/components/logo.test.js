import React from "react"
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect'
import { StaticQuery } from 'gatsby'

import Logo from "./logo"

beforeEach(() => {
  // StaticQuery mock
  StaticQuery.mockImplementation(({ render }) => 
    render({
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
  const style = {
    width: '10px' 
  };
  const { container, getByTestId } = render((
      <Logo styles={ style } />
  ));
  expect(container).toMatchSnapshot()

  // Test content
  expect(container.querySelector('[class*="gatsby-image-wrapper"]')).toBeInTheDocument()
  expect(container.querySelector('picture')).toBeInTheDocument()
  expect(container.querySelector('img')).toBeInTheDocument()
})