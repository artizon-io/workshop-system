import React, { FC, useEffect, useRef, useState } from 'react';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, ModalProps, Input, InputAddon, InputLeftAddon, InputGroup, SlideFade, Box, Collapse, Spinner, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';
import { Workshop } from 'types/workshop';
import { Flexbox } from 'components/flexbox';
import { useWorkshopConfidentialRealtime } from 'hooks/useWorkshopConfidential';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly setIsEnrollDetailsOpened: (state: boolean) => void;
  readonly workshop: Workshop;
}


export const WorkshopModalAdminEnrollDetails: FC<Props> = ({
  setIsEnrollDetailsOpened,
  workshop,
  ...props
}) => {
  const [workshopConfidential, isLoading, error] = useWorkshopConfidentialRealtime(workshop.id);

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

  return (
    <ModalContent {...props}>
      <ModalHeader>Workshop Enroll Details</ModalHeader>
      <ModalBody>
        <Flexbox>
          <Text>Current/Capacity: {workshopConfidential.current}/{workshop.capacity}</Text>
          <TableContainer>
            <Table variant='simple'>
              {/* <TableCaption>Workshop enrolled members details</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>Last Name</Th>
                  <Th>First Name</Th>
                  <Th>Phone number</Th>
                  <Th>Email</Th>
                  <Th>Payment status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {workshopConfidential.enrolls.map(entity => <Tr key={entity.id}>
                  <Td>{entity.lastName}</Td>
                  <Td>{entity.firstName}</Td>
                  <Td>{entity.phone}</Td>
                  <Td>{entity.email}</Td>
                  <Td>{entity.paymentStatus}</Td>
                </Tr>)}
              </Tbody>
              {/* <Tfoot>
                <Tr>
                  <Th>Name</Th>
                  <Th>Phone number</Th>
                  <Th>Email</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
        </Flexbox>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme={"blue"}
          onClick={() => setIsEnrollDetailsOpened(false)}
        >Back</Button>
      </ModalFooter>
    </ModalContent>
  );
}