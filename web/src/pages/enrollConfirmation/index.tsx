import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Heading, Input, InputGroup, InputLeftAddon, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Layout } from 'layout/layout';


const StyledHome = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
`;

export const EnrollConfirmation: FC<{}> = ({ ...props }) => {
  const { enrollId, workshopId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string>(null);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    // In 1 axios request: ...
    // session auth
    // check payment status
    // fetch invoice
    setIsLoading(false);
  }, []);

  if (error)
    return (
      <Text>You do not have permission to this page</Text>
    );

  return (
    isLoading
      ? <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />
      : <Layout>
        <StyledHome {...props}>
          <Heading fontWeight={'medium'}>Success</Heading>
          <Text>A confirmation email has been sent to {email}</Text>
        </StyledHome>
      </Layout>
  );
}