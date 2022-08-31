import React, { FC } from "react";
import styled from "@emotion/styled"


export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  border: 1px solid #e7e7e7;
  border-radius: 20px;
`;


export const Card : FC<{

} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
    <StyledCard {...props}>{children}</StyledCard>
  );
}