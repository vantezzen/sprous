import React from "react"

import { FooterContainer, SupportLink } from "../styles/footer"

const Footer = () => {
  return (
    <FooterContainer>
      <SupportLink href="https://github.com/vantezzen/sprous">
        powered by{" "}
        <span role="img" aria-label="sprout emoji">
          🌱
        </span>
        sprous
      </SupportLink>
    </FooterContainer>
  )
}

export default Footer
