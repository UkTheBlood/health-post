import React, { useState } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Signup() {
  const [state, setState] = useState({ id: '', pw: '', nickname: '' });
  const [cookies, setCookie] = useCookies(['userToken']);

  const handleSignup = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/signup', state);
      setCookie('userToken', data.token);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <StDiv>
      <h1>회원가입</h1>
      <div>
        <StInput
          type="text"
          name="id"
          placeholder="아이디"
          value={state.id}
          onChange={handleChange}
        />
        <br></br>
        <StInput
          type="password"
          name="pw"
          placeholder="비밀번호"
          value={state.pw}
          onChange={handleChange}
        />
        <br></br>
        <StInput
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={state.nickname}
          onChange={handleChange}
        />
        <br></br>
        <StBtn onClick={handleSignup}>회원가입</StBtn>
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
  border: 3px solid transparent;
  margin: 50px;
`;

const StInput = styled.input`
  height: 50px;
  margin: 10px;
`;

const StBtn = styled.button`
  background-color: gray;
`;
