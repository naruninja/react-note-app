import React from 'react'
import styled from 'styled-components'
import { LanguageSwitcher } from '_/LanguageSwitcher'

export const PageHeader: React.FC = ({ children }) => {
   return (
      <div
         css={`
            display: flex;
            justify-content: space-between;
         `}>
         <PageTitle>{children}</PageTitle>
         <LanguageSwitcher />
      </div>
   )
}
export const AppContainer = styled.section.attrs({ className: 'container' })`
   padding-top: 32px;
   @media only screen and (max-width: 1023px) {
      padding-left: 32px;
      padding-right: 32px;
   }
   @media only screen and (max-width: 500px) {
      padding-left: 16px;
      padding-right: 16px;
   }
`
export const PageTitle = styled.h1.attrs({ className: 'title' })`
   color: white;
`
