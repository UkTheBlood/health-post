import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addPost, getPosts } from '../api/post/postapi';

function Main() {
  const { isLoading, isError, data } = useQuery('posts', getPosts);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  console.log("메인 페이지 로드")
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
        <div>
          {data.map((posts) => {
            return (
              <Link to={`/detail/${posts.postId}`} key={posts.postId}>
                <StDivContainer>
                  <StPTitle>{posts.title}</StPTitle>
                  <StPLike>👍 {posts.likes}</StPLike>
                </StDivContainer>
              </Link>
            );
          })}
        </div>
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
  margin-bottom: 80px;
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
  border-radius: 10px;
`;
const StDivContainer = styled.div`
  width: 600px;
  height: 40px;
  margin: 40px auto 0px auto;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 20px;

  display: flex;
`;
const StPTitle = styled.p`
  margin-right: auto;
  font-size: 22px;
  line-height: 0px;
  color: black;
`;
const StPLike = styled.p`
  line-height: 0px;
  font-size: 20px;
  color: black;
`;
