import { styled } from "@styleProvider";

const DialogFooter = styled('div', {
  width: '100%',
  display: 'grid',
  justifyContent: 'end',
  gap: '10px',
  // gridTemplateColumns: 'repeat(auto-fit, max(120px))',
  gridTemplateColumns: 'repeat(auto-fit, max(120px))',
});

export default DialogFooter;