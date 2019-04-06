import styled from "styled-components"
import tw from "tailwind.macro"

export const Nav = styled.nav`
  ${tw`flex items-center flex-wrap bg-white p-6 shadow`};
`

export const LogoContainer = styled.div`
  ${tw`flex items-center flex-no-shrink mr-6`};
`
export const LogoLink = {
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
}
export const TextLogo = styled.div`
  ${tw`font-thin text-xl tracking-tight no-underline`};
`
export const ImageLogo = {
  width: "2rem",
  marginRight: "0.5rem",
}

export const ToggleContainer = styled.div`
  ${tw`block lg:hidden`};
`
export const ToggleButton = styled.button`
  ${tw`flex items-center px-3 py-2 border rounded text-grey-dark border-grey-dark hover:text-grey hover:border-grey`};
`

export const LinksContainer = styled.div`
  ${tw`block flex-grow flex items-center w-auto`};
`
export const LinksSpacingLeft = styled.div`
  ${tw`text-sm flex-grow`};
`
export const NavLink = styled.a`
  ${tw`text-grey-dark hover:text-grey-darker mr-4 no-underline`};
`
