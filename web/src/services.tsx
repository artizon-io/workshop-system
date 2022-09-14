import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';


const queryClient = new QueryClient();

export const Services : FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {window.location.hostname === 'localhost' && <ReactQueryDevtools/>}
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
}