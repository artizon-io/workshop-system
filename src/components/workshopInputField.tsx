import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Input, Text } from '@chakra-ui/react';


const StyledWorkshopInputField = styled.span`

`;

export const WorkshopInputField: FC<{
  readonly k: string;
  readonly value: string;
  readonly isUpdating: boolean;

} & React.HTMLAttributes<HTMLInputElement>> = ({
  k,
  value,
  onChange,
  isUpdating,
  placeholder,
  ...props
}) => {
  return (
    <StyledWorkshopInputField {...props}>
      <Text fontWeight="medium">{k}</Text>
      <Input
        value={value}
        onChange={onChange}
        disabled={isUpdating}
        placeholder={placeholder}
      />
    </StyledWorkshopInputField>
  );
}