import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Heading, Text } from '@chakra-ui/react';


const StyledMapErrorFallback = styled.div`

`;

export const MapErrorFallback: FC<{
  readonly error : any;
  readonly resetErrorBoundary : any;

} & React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  return (
    <StyledMapErrorFallback {...props}>
      <Text>Error rendering map</Text>
    </StyledMapErrorFallback>
  );
}