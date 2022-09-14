import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Heading, Text } from '@chakra-ui/react';


const StyledMapErrorFallback = styled.div`

`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly error : any;
  readonly resetErrorBoundary : any;
}

export const MapErrorFallback: FC<Props> = ({ ...props }) => {
  return (
    <StyledMapErrorFallback {...props}>
      <Text>Error rendering map</Text>
    </StyledMapErrorFallback>
  );
}