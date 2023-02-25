import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getComments } from '../api/comment/commentapi';

function Comments() {
  const params = useParams();   // props로 data를 내려주면 안 될듯

  const { isLoading, isError, data } = useQuery('comments', () => {
    return getComments(params.id);
  });

  if (isLoading) return <h1>로딩중</h1>;
  if (isError) return <h1>에러 발생</h1>;

  return (
    <StDivWrap>
      <StDivAddcomment>
        <StPAddcomment></StPAddcomment>
        <StInputAddcommnet />
        <StBtnAddcomment>작성</StBtnAddcomment>
      </StDivAddcomment>
      <div>
        {data.map((comments) => {
          return (
            <div key={comments.commentId}>
              <p>
                닉네임 : {comments.nickname} 댓글 : {comments.content}
              </p>
            </div>
          );
        })}
      </div>
    </StDivWrap>
  );
}

export default Comments;

const StDivWrap = styled.div`
  width: 600px;
  margin: 0px auto 400px auto;
  padding: 20px;
  border: 1px solid antiquewhite;
  border-radius: 10px;
`;
const StDivAddcomment = styled.div`
  background-color: antiquewhite;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
`;
const StPAddcomment = styled.p`
  margin-left: 10px;
`;
const StInputAddcommnet = styled.input`
  width: 350px;
  height: 10px;
  margin: 0px 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  padding: 10px;
`;
const StBtnAddcomment = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: #9dc08b;
`;
