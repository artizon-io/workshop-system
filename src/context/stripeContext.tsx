import React from 'react';


export const StripeContext = React.createContext<{
  stripeClientSecret: string;
  setStripeClientSecret: (state: string) => void;
}>(null);