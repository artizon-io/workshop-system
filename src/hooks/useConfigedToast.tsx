import { useToast, UseToastOptions } from "@chakra-ui/react";

export const useConfigedToast = (options? : UseToastOptions) => useToast({
  position: "bottom",
  duration: 10000,
  isClosable: true,
  ...options
});