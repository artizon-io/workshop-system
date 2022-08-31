import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const StyledFooter = styled.footer`
  border-top: 1px solid #ebebeb;
  padding: 20px;

  & > .links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    justify-items: center;

    list-style: none;

    a {
      color: #5d677e;
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 3px;

      &:hover{
        color: #2b344a;
        text-decoration-color: #2b344a;
      }
    }
  }
`;

export const Footer: FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  return (
    <StyledFooter {...props}>
      <ul className="links">
        <li><Link to="/">FAQs</Link></li>
        <li><Link to="/">Terms</Link></li>
        <li><Link to="/">Privacy</Link></li>
      </ul>
    </StyledFooter>
  );
}