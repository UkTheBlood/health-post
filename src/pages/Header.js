import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUser, removeUser } from '../until/localstorage';
import { FaHome } from 'react-icons/fa';

function Header() {
  const userInfo = getUser();
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (window.confirm('로그아웃 하시겠습니까?') === true) {
      removeUser();
      alert('메인 화면으로 돌아갑니다');
      navigate('/');
    } else {
      return;
    }
  };

  return (
    <StDivWrap>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <StPLogo><FaHome></FaHome></StPLogo>
      </Link>
      {userInfo ? (
        <StBtnlogout onClick={() => logoutHandler()}>로그아웃</StBtnlogout>
      ) : (
        <>
          <div>
            <StBtnlogout onClick={() => navigate('/login')}>로그인</StBtnlogout>
            <StBtnlogout onClick={() => navigate('/signup')}>
              회원 가입
            </StBtnlogout>
          </div>
        </>
      )}
    </StDivWrap>
  );
}

export default Header;

const StDivWrap = styled.div`
  height: 70px;
  padding: 5px;
  text-align: center;
  background-color: #114B79;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StPLogo = styled.p`
  font-size: 38px;
  color: #9EB3C2;
  margin-left: 20px;
`;
const StBtnlogout = styled.button`
  margin: 0px 20px 0px auto;
  width: 150px;
  height: 45px;
  border: none;
  background-color: #5D93AB;
  border-radius: 10px;
  color: white;
`;
