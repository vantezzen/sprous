import styled from "styled-components"
import tw from "tailwind.macro"

export const Item = styled.div`
  ${tw`category w-full mt-10 p-8 shadow-lg bg-white flex`};
`
export const ItemNoFlex = styled.div`
  ${tw`category w-full mt-10 p-8 shadow-lg bg-white`};
`
export const ItemIconContainer = styled.div`
  ${tw`pr-8`};
`
export const ItemHeading = styled.span`
  ${tw`text-lg`};
`
export const ItemDescription = styled.p`
  ${tw`text-grey-dark my-4`};
`
export const ItemInfo = styled.p`
  ${tw`text-grey mt-2`};
`
