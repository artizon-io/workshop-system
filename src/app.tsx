import React, { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react'
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const App : FC<{}> = ({}) => {
  return (
    <ChakraProvider>
      <StyledContainer>
        <Heading>Workshop System</Heading>
      </StyledContainer>
    </ChakraProvider>
  )
}

export default App;