import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Login() {
  const [state, setState] = useState({ id: '', pw: '' });
  const [, setCookie] = useCookies(['userToken']);

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        'http://13.209.86.39:3003/api/login',
        state
      );
      setCookie('userToken', data.token);
      alert('로그인 성공!');
    } catch (error) {
      console.error(error);
      // 에러메시지
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <StDiv>
      <h1>로그인</h1>
      <div>
        <StInput
          type="text"
          name="id"
          placeholder="아이디"
          value={state.id}
          onChange={handleChange}
        />
        <br />
        <StInput
          type="password"
          name="pw"
          placeholder="비밀번호"
          value={state.pw}
          onChange={handleChange}
        />
        <br />
        <StBtn onClick={handleLogin}>로그인</StBtn>
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
