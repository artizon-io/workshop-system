import React from 'react';


// Deprecated
export const StripeContext = React.createContext<{
  stripeClientSecret: string;
  setStripeClientSecret: (state: string) => void;
}>(null);