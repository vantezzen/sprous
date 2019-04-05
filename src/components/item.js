import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import getIconComponent from '../utils/getIconComponent'

import {
  Item,
  ItemIconContainer,
  ItemHeading,
  ItemDescription,
  ItemInfo
} from '../styles/item'

const ItemComponent = ({ icon, heading, description, info, link, hideIcon }) => {
  // Get category icon
  const Icon = getIconComponent(icon);

  return (
    <Link 
      to={ '/' + link } 
      key={ link }
      style={{ textDecoration: 'none', color: 'inherit' }}
      data-testid="item-link">
      <Item>
          {
            hideIcon !== true && (
              <ItemIconContainer data-testid="item-icon-container">
                <Icon 
                  style={{ width: '2.5rem', color: '#3d4852' }} 
                  width="100%" 
                  height="100%" 
                  data-testid="item-icon" />
              </ItemIconContainer>
            )
          }
          <div>
              <ItemHeading data-testid="item-heading">{ heading }</ItemHeading>
              <ItemDescription data-testid="item-description">{ description }</ItemDescription>
              <ItemInfo data-testid="item-info">{ info }</ItemInfo>
          </div>
      </Item>
    </Link>
  );
}

ItemComponent.propTypes = {
  icon: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  info: PropTypes.string,
  link: PropTypes.string,
  hideIcon: PropTypes.bool,
}

ItemComponent.defaultProps = {
  icon: `help-circle`,
  heading: ``,
  description: ``,
  info: `0 articles`,
  link: `/`,
  hideIcon: false,
}

export default ItemComponent
