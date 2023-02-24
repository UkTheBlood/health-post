import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDetailPost } from '../api/post/postapi';

function Detail() {
  const param = useParams(); // param -> url의 id(string)

  const [contentState, setContentState] = useState(false);

  // getPosts를 사용해 data(posts 배열)를 받아온다
  const { isLoading, isError, data } = useQuery('detailposts', () => getDetailPost(param.id));

  // React Query 부분
  const queryClient = useQueryClient();

  if (isLoading === true) return <h1>isLoading...</h1>;
  if (isError) return <div>Error</div>;


  return (
    <>
      <div>
        <StDivContentWrap>
          <StDivWriter>
            <StPWriter>작성자 : {data.nickname}</StPWriter>
          </StDivWriter>
          <StDivTitle>
            <p> 제목 : {data.title}</p>
          </StDivTitle>
          <StDivContent>
            <p>{data.content}</p>
          </StDivContent>
          <StDivComment>
            <p>댓글 수 : 냅둡시다 👍 : {data.likes}</p>{' '}
            {/* 댓글 수 백엔드에 없음 */}
          </StDivComment>
          <StDivContentButton>
            <StBtnView> 전체 목록 보기 </StBtnView>
            <StBtnPostUpdate> 수정 </StBtnPostUpdate>
            <StBtnPostDelete> 삭제 </StBtnPostDelete>
          </StDivContentButton>
        </StDivContentWrap>
      </div>
    </>
  );
}

export default Detail;

const StDivContentWrap = styled.div`
  width: 600px;
  margin: 40px auto;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: antiquewhite;
`;
const StDivWriter = styled.div`
  text-align: right;
`;
const StPWriter = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
const StDivTitle = styled.div`
  width: 550px;
  height: 40px;
  margin: 20px auto;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  line-height: 10px;
`;
const StDivContent = styled.div`
  width: 550px;
  height: 400px;
  margin: auto;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  line-height: 10px;
`;
const StDivComment = styled.div`
  text-align: right;
  margin: 10px;
`;
const StDivContentButton = styled.div`
  display: flex;
`;
const StBtnView = styled.button`
  margin-right: auto;
  margin-bottom: 20px;
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #9dc08b;
`;
const StBtnPostUpdate = styled.button`
  width: 80px;
  height: 40px;
  margin-right: 30px;
  border: none;
  border-radius: 10px;
  background-color: #609966;
`;
const StBtnPostDelete = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #609966;
`;
