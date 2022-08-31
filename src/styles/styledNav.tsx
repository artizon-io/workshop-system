import styled from "@emotion/styled";


export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;

  border-bottom: 1px solid #ebebeb;

  & > .right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;