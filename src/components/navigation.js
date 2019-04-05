import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import Logo from './logo'

import {
  Nav,
  LogoContainer,
  TextLogo,
  ImageLogo,
  LogoLink,
  LinksContainer,
  LinksSpacingLeft,
  NavLink
} from '../styles/navigation'

const Navigation = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            logoType
            settings {
              showBTSLink
              BTSLinkTitle
              BTSLinkHref
            }
          }
          
        }
      }
    `}
    render={data => {
      const { site } = data;

      // Get site metadata
      const title = site.siteMetadata.title
      const logoType = site.siteMetadata.logoType
    
      // Get settings
      const settings = site.siteMetadata.settings;
    
      return (
        <Nav>
          {/* Logo */}
          <LogoContainer>
            <Link to="/" style={ LogoLink }>
              { (logoType === 'image' || logoType === 'combined') && <Logo styles={ ImageLogo } data-testid="navigation-image-logo" /> }
              { (logoType === 'text' || logoType === 'combined') && <TextLogo data-testid="navigation-text-logo">{ title }</TextLogo> }
            </Link>
          </LogoContainer>
    
          {/* <ToggleContainer>
            <ToggleButton>
                <Menu />
            </ToggleButton>
          </ToggleContainer> */}
          {/* BTS Link */}
          {
            settings.showBTSLink && (
              <LinksContainer>
                <LinksSpacingLeft />
                <NavLink href={ settings.BTSLinkHref } data-testid="navigation-bts-link">
                    { settings.BTSLinkTitle }
                </NavLink>
              </LinksContainer>
            )
          }
        </Nav>
      )
    }}
  />
)

export default Navigation
