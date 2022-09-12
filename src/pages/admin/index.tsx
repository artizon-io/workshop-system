import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { Heading, Text, Button, Skeleton } from '@chakra-ui/react';
import { WorkshopList } from 'components/workshopList';
import { useWorkshops } from 'hooks/useWorkshops';
import { WorkshopModalAdmin } from './workshopModalAdmin';
import { AdminLayout } from 'layout/adminLayout';


const StyledAdmin = styled.main`
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > .button-container {
    display: flex;
    justify-content: flex-end;
  }
`;

export const Admin: FC<{}> = ({ ...props }) => {
  const [workshops, isLoading, error] = useWorkshops();
  // const workshops = useWorkshopsRealtime();
  const [isWorkshopModalOpened, setIsWorkshopModalOpened] = useState(false);

  return (
    <AdminLayout>
      <StyledAdmin {...props}>
        <div className="button-container">
          <Button colorScheme="blue" className="button" onClick={() => setIsWorkshopModalOpened(true)}>Add Workshop</Button>
          <WorkshopModalAdmin
            isOpen={isWorkshopModalOpened}
            onClose={() => setIsWorkshopModalOpened(false)}
          />
        </div>
        {isLoading
          ? <Skeleton height='300px'/>
          : <WorkshopList workshops={workshops} adminMode={true}/>
        }
      </StyledAdmin>
    </AdminLayout>
  );
}