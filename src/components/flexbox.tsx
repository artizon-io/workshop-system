import React, { FC, ReactElement } from "react";
import styled, { StyledComponent, StyledOptions, StyledTags } from "@emotion/styled";


const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

interface Props<T extends React.ElementType> {
  as?: T;
}

export const Flexbox =
  <T extends React.ElementType = "div">
  ({as, children, ...props} : Props<T> & React.ComponentProps<T>) => {

  const Component = as || "div";  // not to be confused with TS as keyword

  return (
    <StyledFlexbox as={Component} {...props}>
      {children}
    </StyledFlexbox>
  );
}