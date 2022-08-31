import React, { FC } from "react";
import styled from "@emotion/styled";


const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Flexbox : FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
    <StyledFlexbox {...props}>
      {children}
    </StyledFlexbox>
  );
}