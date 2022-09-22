import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { StyleProvider } from "@artizon/design-system";


const queryClient = new QueryClient();

export const Services : FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider>
        {/* {!import.meta.env.PROD && <ReactQueryDevtools/>} */}
        {children}
      </StyleProvider>
    </QueryClientProvider>
  );
}