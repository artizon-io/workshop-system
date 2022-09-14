import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Heading, Input, InputGroup, InputLeftAddon, Spinner, Text } from '@chakra-ui/react';
import { Flexbox } from 'components/flexbox';
import { useParams } from 'react-router-dom';
import Logger from 'js-logger';
import { useWorkshopOnce } from 'hooks/useWorkshopOnce';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { EnrollPaymentForm } from './enrollPaymentForm';
import { Layout } from 'layout/layout';


const StyledEnrollSummary = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
`;

export const EnrollSummary: FC<{}> = ({ ...props }) => {
  const { enrollId, workshopId } = useParams();
  const [workshop, isLoading, error] = useWorkshopOnce(workshopId);

  if (isLoading)
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />
    );

  // if (error)
  //   return (
      
  //   );

  return (
    <StyledEnrollSummary {...props}>
      <Flexbox>
        <Text>{workshop.title}</Text>
        <Text>Description: {workshop.description}</Text>
        <Text>Date: {workshop.datetime.toDate().toLocaleDateString()}</Text>
        <Text>Time: {workshop.datetime.toDate().toLocaleTimeString()}</Text>
        <Text>Duration: {workshop.duration} mins</Text>
        <Text>Language: {workshop.language}</Text>
        <Text>Capacity: {workshop.capacity}</Text>
        <Text>Fee: HKD {workshop.fee}</Text>
        <Text>Venue: {workshop.venue}</Text>
      </Flexbox>
    </StyledEnrollSummary>
  );
}