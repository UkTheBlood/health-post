import React from 'react';
import styled from 'styled-components';

function Login() {
  return (
    <StDiv>
      <h1>로그인</h1>
      <div>
        <StInput type="text" placeholder="아이디" />
        <br></br>
        <StInput type="text" placeholder="비밀번호" />
        <br></br>
        <StBtn>로그인</StBtn>
      </div>
    </StDiv>
  );
}

export default Login;

const StDiv = styled.div`
  height: 50px;
  padding: 5px;
  text-align: center;
  background-color: antiquewhite;
  border: 3px solid red;
  margin: 50px;
`;

const StInput = styled.input`
  height: 50px;
  margin: 10px;
`;

const StBtn = styled.button`
  background-color: gray;
`;
