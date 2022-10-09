import { styled } from '@styleProvider';
import * as Select from '@radix-ui/react-select';
import React from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

const fontStyles = {
  fontFamily: '$firacode',
  fontSize: '12px',
};

const StyledTrigger = styled(Select.Trigger, {
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  padding: '0 15px',
  backgroundColor: '#000000',
  $$textColor: '#ffffff',
  color: '$$textColor',
  boxShadow: '0 2px 10px #00000033',
  '&[data-placeholder]': {
    color: '$$textColor'
  },
}, fontStyles);

const StyledContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 10px #00000014',
  padding: '10px 0'
});

const StyledItem = styled(Select.Item, {
  position: 'relative',
  color: '#000000',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  height: '30px',
  padding: '0 30px 0 35px',
  userSelect: 'none',
  // '&[data-disabled]': {
  //   color: '#ffffff',
  //   pointerEvents: 'none',
  // },
  '&[data-highlighted]': {
    backgroundColor: '#2a2a2a0b',
  },
}, fontStyles);

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: '25px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledLabel = styled(Select.Label, {
  padding: '0 25px',
  fontSize: '12px',
  lineHeight: '25px',
  color: '#1041b3',
  fontWeight: 'bolder'
}, fontStyles);

const StyledSeparator = styled(Select.Separator, {
  height: '1px',
  backgroundColor: '#eeeeee',
  margin: '5px 0',
});

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '25px',
  color: '#1041b3',
  cursor: 'default',
};

const StyledScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);
const StyledScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);

const data : {[district: string] : {[code: string]: string}} = {
  'Asia': {
    '+852': '+852 Hong Kong',
    '+65': '+65 Singapore',
    '+81': '+81 Japan',
    '+82': '+82 South Korea',
    '+66': '+66 Thailand'
  },
  'Europe': {
    '+44': '+44 United Kingdom',
    '+34': '+34 Spain',
    '+39': '+39 Italy',
    '+33': '+33 France',
    '+41': '+41 Switzerland',
    '+49': '+49 Germany',
    '+32': '+32 Belgium'
  },
  'North America': {
    '+1': '+1 United States / Canada'
  }
};

const phoneDistrictSelect : React.FC<React.ComponentProps<typeof StyledTrigger>> = ({...props}) => {
  return (
    <Select.Root>
      <StyledTrigger {...props}>
        <Select.Value placeholder="Country code"/>
        <Select.Icon>
          <ChevronDownIcon/>
        </Select.Icon>
      </StyledTrigger>

      <Select.Portal>
        <StyledContent>
          <StyledScrollUpButton>
            <ChevronUpIcon/>
          </StyledScrollUpButton>
          <Select.Viewport>
            {Object.entries(data).map(([district, countries], index) => <>
              <Select.Group>
                <StyledLabel>{district}</StyledLabel>
                {Object.entries(countries).map(([code, text]) =>
                  <StyledItem value={code}>
                    <Select.ItemText>{text}</Select.ItemText>
                    <StyledItemIndicator><CheckIcon/></StyledItemIndicator>
                  </StyledItem>
                )}
              </Select.Group>

              {/* Only render separater if it isn't the last district */}
              {index+1 !== Object.keys(data).length && <StyledSeparator/>}
            </>)}
          </Select.Viewport>
          <StyledScrollDownButton>
            <ChevronDownIcon />
          </StyledScrollDownButton>
        </StyledContent>
      </Select.Portal>
    </Select.Root>
  );
}

export default phoneDistrictSelect;