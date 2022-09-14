import React, { FC, useEffect, useRef, useState } from 'react';
import { Heading, Text, Modal, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, Button, ModalProps, Input, InputAddon, InputLeftAddon, InputGroup, SlideFade, Box, Collapse, Spinner, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly isUpdating: boolean;
  readonly formButtonRef: React.MutableRefObject<HTMLButtonElement>;
}

export const WorkshopModalAdminAddModeFooter: FC<Props> = ({
  isUpdating,
  formButtonRef,
  ...props
}) => {

  return (
    <ModalFooter {...props}>
      <Button
        disabled={isUpdating}
        colorScheme="blue"
        onClick={() => {
          formButtonRef.current.click();
        }}
      >
        Create
      </Button>
    </ModalFooter>
  );
}