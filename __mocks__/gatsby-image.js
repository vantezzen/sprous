const React = require("react")
const gatsbyImage = jest.requireActual("gatsby-image")

module.exports = {
  ...gatsbyImage,
  Img: jest.fn().mockImplementation(() => <div />),
}