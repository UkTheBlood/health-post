import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <StDivWrap>
      <Link to={'/'}>
        <StPLogo>🏠</StPLogo>
      </Link>
    </StDivWrap>
  );
}

export default Header;

const StDivWrap = styled.div`
  height: 50px;
  padding: 5px;
  text-align: center;
  background-color: antiquewhite;
`;
const StPLogo = styled.p`
  font-size: 33px;
  color: black;
  margin: 0px;
`;
