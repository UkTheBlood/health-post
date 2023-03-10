import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Signup() {
  const [state, setState] = useState({
    id: '',
    pw: '',
    nickname: '', // 초기값을 빈 문자열로 변경
  });

  const navigate = useNavigate();



  const handleIdCheck = async () => {
    if (!state.id) {
      alert('이메일을 입력해주세요.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(state.id) === false) {
      alert('유효한 이메일을 입력해주세요.');
      return;
    }

    // 정규표현식으로 체크->axios

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/check?email=${state.id}`
      );
      // console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      // console.log(error.response);
      alert(error.response.data.message);
    }
  };

  const handleNicknameCheck = async () => {
    if (!state.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/check?nickname=${state.nickname}`
      );
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      // console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/api/signup`, {
        email: state.id,
        nickname: state.nickname,
        password: state.pw,
      });
      alert('회원가입 성공!');
      navigate('/');
    } catch (error) {

      alert(error.response.data.message);

      // 에러메시지
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <StDiv>
      <h1>회원가입</h1>
      <StItem>
        <StBox>
          <StInput
            type="text"
            name="id"
            placeholder="아이디"
            value={state.id}
            onChange={handleChange}
          />
          <StCheckbutton onClick={handleIdCheck}>중복확인</StCheckbutton>
        </StBox>

        <StBox>
          <StInput
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={state.nickname}
            onChange={handleChange}
          />
          <StCheckbutton onClick={handleNicknameCheck}>중복확인</StCheckbutton>
        </StBox>

        <StBox>
          <StInput
            type="password"
            name="pw"
            placeholder="비밀번호"
            value={state.pw}
            onChange={handleChange}
          />
        </StBox>
        <div>
          <StBtn onClick={handleSignup}>회원가입</StBtn>
        </div>
      </StItem>
    </StDiv>
  );
}

export default Signup;

const StDiv = styled.div`
  height: 50px;
  padding: 5px;
  text-align: center;
  border: 3px solid transparent;
  margin: 50px;
`;

const StInput = styled.input`
  height: 20px;
  padding: 10px;
  width: 350px;
  margin: 10px;
  text-align: center;
  border-radius: 10px;
`;

const StBtn = styled.button`
  color: black;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #54859a;
  color: white;
`;

const StCheckbutton = styled.button`
  color: black;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #54859a;
  color: white;
`;

const StItem = styled.div`
  width: 500px;
  border: 1px solid;
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StBox = styled.div`
  margin-right: auto;
`;
