import styled from "styled-components"
import tw from "tailwind.macro"

export const ContentOuterContainer = styled.div`
  ${tw`content pt-16 flex justify-center pb-16`}
`
export const ContentInnerContainer = styled.div`
  ${tw`container w-3/4 lg:w-1/2`}
`
export const SearchField = styled.input`
  ${tw`w-full h-12 p-8 shadow-lg text-lg`}
`