import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import { IoLanguage, IoLocationSharp, IoClose } from 'react-icons/io5';
import { IconText } from '@components/iconText';

const StyledTitle = styled('h1', {
  fontFamily: '$ibmplexmono',
  color: '$gray100',
  fontSize: '22px',
  fontWeight: 400
});

const StyledBodyText = styled('p', {
  fontFamily: '$inter',
  color: '$gray650',
  fontSize: '15px',
  fontWeight: 300,
  lineHeight: 1.8,
})

const StyledBody = styled('div', {
  flexbox: 'column',
  justifyContent: 'space-between',
  gap: '20px',
  alignItems: 'flex-start'
});

const StyledLeft = styled('div', {
  gridArea: 'left',

  flexbox: 'column',
  gap: '20px',
  alignItems: 'flex-start',
  [`& > ${StyledBody}`]: {
    flex: 1
  }
});

const Left : React.FC<React.ComponentProps<typeof StyledLeft>> = ({ ...props }) => {
  return (
    <StyledLeft className='left' {...props}>
      <StyledTitle>Workshop</StyledTitle>
      <StyledBody>
        <StyledBodyText>A fantastic workshop hosted in Hong Kong. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</StyledBodyText>
        <IconText>
          <IoLocationSharp/>
          Tsim Sha Tsui, Hong Kong
        </IconText>
      </StyledBody>
    </StyledLeft>
  );
}

StyledLeft.toString = () => '.left';

export default Left;