import React from "react"
import { render, fireEvent, cleanup } from "react-testing-library"
import "jest-dom/extend-expect"

import Footer from "./footer"

afterEach(cleanup)

it("renders correctly", () => {
  const { container } = render(<Footer />)
  expect(container).toMatchSnapshot()
})
