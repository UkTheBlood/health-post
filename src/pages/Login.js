import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

const cookie = new Cookies();
export const getCookie = (name) => {
  return cookie.get(name);
};

console.log(getCookie);

function Login() {
  const [state, setState] = useState({ username: '', password: '' });
  // const [, setCookie] = useCookies(['userToken']);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/login`,
        state
      );
      // setCookie('userToken', data.token);
      alert('로그인 성공!');
      console.log(data);
      navigate('/');
    } catch (error) {
      // 에러메시지
    }
  };
  // 아이디 이메일형식으로 수정, 중복여부 버튼 만들어보기

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
          name="username"
          placeholder="아이디"
          value={state.username}
          onChange={handleChange}
        />
        <br />
        <StInput
          type="password"
          name="password"
          placeholder="비밀번호"
          value={state.password}
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
