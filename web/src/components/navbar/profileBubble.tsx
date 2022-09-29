import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { styled } from '@styleProvider';
import type * as Stitches from '@stitches/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger, Root as PopoverRoot } from '@radix-ui/react-popover';
import { ProfileBubbleTrigger } from './profileBubbleTrigger';
import { ProfileBubbleContent } from './profileBubbleContent';

type StyledProfileBubbleVariants = Stitches.VariantProps<typeof StyledProfileBubble>

const StyledProfileBubble = styled(PopoverRoot, {

});

interface Props extends React.ComponentProps<typeof StyledProfileBubble> {
  img: string;
};

export const ProfileBubble: React.FC<Props> = ({ img, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setIsOpen(false))
  }, []);

  return (
    <StyledProfileBubble {...props} open={isOpen}>
      <PopoverTrigger asChild={true}>
        <ProfileBubbleTrigger img={img} open={() => setIsOpen(true)} close={() => setIsOpen(false)} toggle={() => setIsOpen(prev => !prev)}/>
      </PopoverTrigger>
      {/* <PopoverAnchor /> */}
      <AnimatePresence>
        {/* See https://github.com/radix-ui/primitives/discussions/1058 */}
        {isOpen &&
          <PopoverPortal forceMount={true}>
            <PopoverContent asChild={true} forceMount={true} collisionPadding={{
              right: 10
            }} sideOffset={20}>
              <ProfileBubbleContent isOpen={isOpen}/>
            </PopoverContent>
          </PopoverPortal>
        }
      </AnimatePresence>
    </StyledProfileBubble>
  );
};