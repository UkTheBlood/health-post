import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  return (
    <StDivWrap>
      <div>
        <StDivWrite>
          <StPPost>게시물 (갯수)</StPPost>
          <Link to={'/write'}>
            <StPWrite>글쓰러 가기</StPWrite>
          </Link>
        </StDivWrite>
      </div>
      <div>
        <h1>게시물 나열</h1>
      </div>
    </StDivWrap>
  );
}

export default Main;

const StDivWrap = styled.div`
  margin: 30px;
`;

const StDivWrite = styled.div`
  height: 50px;
  display: flex;
  margin-bottom: 30px;
`;
const StPPost = styled.p`
  margin-right: auto;
  width: 130px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
`;
const StPWrite = styled.p`
  color: black;
  text-decoration: none;
  margin-left: auto;
  width: 130px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  background-color: antiquewhite;
`;
