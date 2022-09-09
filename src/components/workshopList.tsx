import React, { FC } from 'react';
import styled from '@emotion/styled';
import { WorkshopBrief } from './workshop';
import { Workshop } from '../hooks/useWorkshop';
import { Text } from '@chakra-ui/react';
import { Flexbox } from './flexbox';
import { WorkshopModalAdmin } from './workshopModalAdmin';


const StyledWorkshopList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly workshops: Workshop[];
  readonly adminMode: boolean;
}

export const WorkshopList: FC<Props> = ({ workshops, adminMode, ...props }) => {
  return (
    <StyledWorkshopList {...props}>
      {workshops
        ? workshops.map(workshop => <WorkshopBrief
          key={workshop.id}
          workshop={workshop}
          isAdmin={adminMode}
        />)
        : <Text>Loading...</Text>
      }
    </StyledWorkshopList>
  );
}