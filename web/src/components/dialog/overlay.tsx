import { AlertDialogOverlay } from "@radix-ui/react-alert-dialog";
import { styled } from "@styleProvider";
import { motion } from "framer-motion";
import React from "react";

const StyledOverlay = styled(AlertDialogOverlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  zIndex: 10000,
  backdropFilter: 'blur(3px)',
  position: 'fixed',
  inset: 0
});

const Overlay: React.FC = React.forwardRef(({ ...props }, ref) => {
  return (
    <StyledOverlay {...props} asChild={true}>
      <motion.div
        // onClick={close}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{

        }}
        exit={{
          opacity: 0
        }}
      />
    </StyledOverlay>
  );
});

export default Overlay;