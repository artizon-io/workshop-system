import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Nav } from './nav';
import { Footer } from './footer';


const StyledLayout = styled.div`

`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

export const Layout: FC<Props> = ({ children, ...props }) => {
  return (
    <StyledLayout {...props}>
      <Nav/>
      {children}
      <Footer/>
    </StyledLayout>
  );
}