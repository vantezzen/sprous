import React from "react"
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect'

import Item from "./item"

afterEach(cleanup)

it("renders correctly", () => {
  const { container, getByTestId, getByText } = render((
      <Item 
        icon="CreditCard"
        heading="HEADING"
        description="DESCRIPTION"
        info="INFO"
        link="link"
        key="1" />
  ));
  expect(container).toMatchSnapshot()

  // Test link
  expect(getByTestId('item-link')).toHaveAttribute('href', '/link')

  // Test icon
  expect(getByTestId('item-icon')).toBeInTheDocument()

  // Test text content
  expect(getByTestId('item-heading')).toHaveTextContent('HEADING')
  expect(getByTestId('item-description')).toHaveTextContent('DESCRIPTION')
  expect(getByTestId('item-info')).toHaveTextContent('INFO')
})

it('hides the icon', () => {
  const { container } = render((
    <Item 
      icon="CreditCard"
      hideIcon={ true }
      heading="HEADING"
      description="DESCRIPTION"
      info="INFO"
      link="link"
      key="1" />
  ));
  expect(container).toMatchSnapshot()

  expect(container.querySelector(`[data-testid="item-icon-container"]`)).not.toBeInTheDocument()
  expect(container.querySelector(`[data-testid="item-icon"]`)).not.toBeInTheDocument()
})
