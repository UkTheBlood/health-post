import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

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

      // jwtToken 을 userToken으로 지정 => 쿠키에 토큰 저장
      setCookie('userToken', jwtToken);

      alert('로그인 성공!');

      const decodedUserInfo = jwtDecode(jwtToken);
      console.log(decodedUserInfo);

      // 토큰에 저장되어있는 userInfo 저장
      localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo));

      navigate('/');
      return data;
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
      <h1>Sign in</h1>
      <StDivloginform>
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
      </StDivloginform>
    </StDiv>
  );
}

export default Login;

const StDiv = styled.div`
  width: 400px;
  height: 350px;
  padding: 5px;
  text-align: center;
  margin: 30px auto;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`;
const StInput = styled.input`
padding: 10px;
  height: 25px;
  width: 300px;
  margin: 10px auto;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
`;
const StDivloginform = styled.div`
`
const StBtn = styled.button`
  background-color: #065A82;
  width: 100px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 15px;
`;
