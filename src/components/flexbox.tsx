import React, { FC } from "react";
import styled, { StyledComponent, StyledOptions, StyledTags } from "@emotion/styled";
import { StyledComponentProps } from "../types/emotion";


const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement>, StyledComponentProps {

}

export const Flexbox : FC<Props> = ({children, ...props}) => {
  return (
    <StyledFlexbox {...props}>
      {children}
    </StyledFlexbox>
  );
}