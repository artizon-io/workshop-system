import React, { FC, ReactElement } from "react";
import styled, { StyledComponent, StyledOptions, StyledTags } from "@emotion/styled";


const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

interface Props<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

export const Flexbox =
  <T extends React.ElementType = "div">  // by default as="div"
  ({as, children, ...props} : Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {  // TODO

  const Component = as || "div";  // not to be confused with TS as keyword

  return (
    <StyledFlexbox {...props}>
      {children}
    </StyledFlexbox>
  );
}