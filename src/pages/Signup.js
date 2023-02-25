import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import axios from 'axios';

// 리액트쿠키 라이브러리?

function Signup() {
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [nickname, setNickname] = useState();

  return (
    <StDiv>
      <h1>회원가입</h1>
      <div>
        <StInput type="text" placeholder="아이디" />
        <br></br>
        <StInput type="text" placeholder="비밀번호" />
        <br></br>
        <StInput type="text" placeholder="닉네임" />
        <br></br>
        <StBtn>회원가입</StBtn>
      </div>
    </StDiv>
  );
}

export default Signup;

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
