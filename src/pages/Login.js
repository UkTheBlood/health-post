import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../until/cookie/index';

function Login() {
  const [state, setState] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['userToken']);

  const handleLogin = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/login`,
        state
      );
    
      const jwtToken = data.data.token;
      console.log("jwtToken", jwtToken)

      // jwtToken 을 userToken으로 지정 => 쿠키에 토큰 저장
      setCookie('userToken', jwtToken);
      // const decodedUserInfo = jwt_decode(jwtToken);

      // 토큰에 저장되어있는 userInfo 저장
      // localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo));

      console.log('data', data);
      alert('로그인 성공!');
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
          name="email"
          placeholder="이메일"
          value={state.email}
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
