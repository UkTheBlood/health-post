import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addPost, getPosts } from '../api/post/postapi';

function Main() {
  const { isLoading, isError, data } = useQuery('posts', getPosts);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <StDivWrap>
      <div>
        <StDivWrite>
          <StPPost>게시물 ({data.length})</StPPost>
        </StDivWrite>
      </div>
      <div>
        <div>
          {data.map((posts) => {
            return (
              <Link to={`/detail/${posts.postId}`} key={posts.postId}  style={{ textDecoration: "none" }}>
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

// const StLink = styled.Link`
//   text-decoration: none;
// `
const StDivWrap = styled.div`
  margin: 30px;
`;

const StDivWrite = styled.div`
  display: flex;
`;
const StPPost = styled.p`
  margin-right: auto;
  text-align: center;
  font-size: 20px;
`;
const StDivContainer = styled.div`
  width: 600px;
  height: 40px;
  margin: 20px auto 0px auto;
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
