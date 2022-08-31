import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Input, Text } from '@chakra-ui/react';


const StyledWorkshopInputField = styled.span`

`;

export const WorkshopInputField: FC<{
  readonly k: string;
  readonly value: string;

} & React.HTMLAttributes<HTMLInputElement>> = ({
  k,
  value,
  onChange,
  ...props
}) => {
  return (
    <StyledWorkshopInputField {...props}>
      <Text fontWeight="medium">{k}</Text>
      <Input
        value={value}
        onChange={onChange}
      />
    </StyledWorkshopInputField>
  );
}