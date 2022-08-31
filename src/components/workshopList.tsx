import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Workshop, WorkshopType } from './workshop';
import { Text } from '@chakra-ui/react';
import { Flexbox } from './flexbox';


const StyledWorkshopList = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

export const WorkshopList: FC<{
  readonly workshops: WorkshopType[]
  readonly adminMode: boolean;

} & React.HTMLAttributes<HTMLDivElement>> = ({ workshops, adminMode, ...props }) => {
  return (
    <StyledWorkshopList {...props}>
      {
        workshops ? workshops.map(workshop => <Workshop
          key={workshop.id}
          workshop={workshop}
          adminMode={adminMode}
        />) : <Text>Loading...</Text>
      }
    </StyledWorkshopList>
  );
}