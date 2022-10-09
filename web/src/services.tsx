import React, { FC } from 'react';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import StyleProvider from "@styleProvider";
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@radix-ui/react-toast'


// const queryClient = new QueryClient();

export const Services : FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
  return (
    // <QueryClientProvider client={queryClient}>
      <StyleProvider>
        {/* {import.meta.env.DEV && <ReactQueryDevtools/>} */}
        <BrowserRouter>
          <ToastProvider>
            {children}
          </ToastProvider>
        </BrowserRouter>
      </StyleProvider>
    // </QueryClientProvider>
  );
}