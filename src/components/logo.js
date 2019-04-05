import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Logo = ({ styles }) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "icon.png" }) {
          childImageSharp {
            fluid(maxWidth: 50) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} style={ styles } data-testid="logo-image" />}
  />
)
export default Logo
