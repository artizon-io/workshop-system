import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { motion } from 'framer-motion';

type StyledProfileBubbleTriggerVariants = Stitches.VariantProps<typeof StyledProfileBubbleTrigger>

const StyledProfileBubbleTrigger = styled(motion.img, {
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  '&:hover': {
    cursor: 'pointer'
  },
});

interface Props extends React.ComponentProps<typeof StyledProfileBubbleTrigger> {
  img: string;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const ProfileBubbleTrigger: React.FC<Props> = React.forwardRef(({ img, open, close, toggle, ...props }, ref) => {
  return (
    <StyledProfileBubbleTrigger src={img} {...props} ref={ref}
      // onHoverStart={() => open()}
      onClick={() => toggle()}
      whileHover={{
        scale: 1.1
      }}
      whileTap={{
        scale: 1
      }}
    />
  );
});