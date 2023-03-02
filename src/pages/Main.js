import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../api/post/postapi';

function Main() {
  const { isLoading, isError, data } = useQuery('posts', getPosts);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  // console.log(data);

  return (
    <StDivWrap>
      <div>
        <StDivWrite>
          <StPPost>게시물 ({data.length})</StPPost>
          <Link to={'/write'}>
            <StBtnWrite>게시물 작성</StBtnWrite>
          </Link>
        </StDivWrite>
      </div>
      <div>
        <div>
          {data.map((posts) => {
            return (
              <Link
                to={`/detail/${posts.postId}`}
                key={posts.postId}
                style={{ textDecoration: 'none' }}
              >
                <StDivContainer>
                  <StPTitle>{posts.title}</StPTitle>
                  <StPLike>💓 {posts.likesCount}</StPLike>
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
  display: flex;
`;
const StBtnWrite = styled.button`
  margin-left: auto;
  width: 120px;
  height: 35px;
  border-radius: 10px;
  border: none;
  background-color: #5d93ab;
  color: white;
`;
const StPPost = styled.p`
  margin-right: auto;
  text-align: center;
  font-size: 20px;
`;
const StDivContainer = styled.div`
  width: 600px;
  height: 40px;
  margin: 30px auto 0px auto;
  padding: 20px;
  border-radius: 20px;
  background-color: #5d93ab;
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
