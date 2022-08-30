import React, { FC } from "react";
import styled from "@emotion/styled"


const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


export const Card : FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
    <StyledCard {...props}>{children}</StyledCard>
  );
}