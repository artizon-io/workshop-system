import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@styleProvider';
import { BiTime, BiStopwatch } from 'react-icons/bi';
import { MdPersonAdd, MdDateRange, MdAttachMoney, MdPerson, MdInfoOutline } from 'react-icons/md';
import { IoLanguage, IoLocationSharp, IoClose } from 'react-icons/io5';
import { IconText } from '@components/iconText';

const StyledRight = styled('div', {
  gridArea: 'right',

  flexbox: 'column',
  gap: '30px',
  alignItems: 'flex-start',
});

const Right : React.FC<React.ComponentProps<typeof StyledRight>> = ({ ...props }) => {
  return (
    <StyledRight className='right' {...props}>
      <IconText>
        <MdDateRange style={{ fontSize: '17px' }}/>
        21/Jul
      </IconText>
      <IconText>
        <BiTime style={{ fontSize: '18px' }}/>
        09:00am
      </IconText>
      <IconText>
        <IoLanguage style={{ fontSize: '18px' }}/>
        EN/CH
      </IconText>
      <IconText>
        <BiStopwatch style={{ fontSize: '20px' }}/>
        2hr
      </IconText>
      <IconText>
        <MdAttachMoney style={{ fontSize: '20px' }}/>
        HKD 200
      </IconText>
    </StyledRight>
  );
}

StyledRight.toString = () => '.right';

export default Right;