import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addPost, deletePost, getDetailPost, updatePost } from '../api/post/postapi';

// React => useMutation => await Axios => BE(Error) => await Axios => useMutation

function Detail() {
  const param = useParams(); // param -> url의 id(string)
  const navigate = useNavigate();

  const [contentState, setContentState] = useState(false);

  const onChangeInputTitleHandler = (e) => {
    setInputTitle(e.target.value);
  };
  const onChangeTextareaContentHandler = (e) => {
    setInputContent(e.target.value);
  };

  // getPosts를 사용해 data(posts 배열)를 받아온다
  const { isLoading, isError, data } = useQuery('detailposts', () =>
    getDetailPost(param.id)
  );

  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');

  // React Query 부분
  const queryClient = useQueryClient();
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('detailposts');
    },
    onError: () => {
      alert(isError);
    },
  });

  const updatemutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  })

  // 삭제 버튼
  const deleteButton = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      navigate('/');
      mutation.mutate(id);
    } else {
      return;
    }
  };

  // 저장 버튼
  const saveButton = (id, inputTitle, inputContent) => {
    setContentState(false);
    updatemutation.mutate({id, inputTitle, inputContent});
  }

  if (isLoading) return <h1>로딩중</h1>;
  if (isError) return <h1>에러 발생</h1>;

  return (
    <>
      <div>
        {contentState === false ? (
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
              <p>댓글 수 : 냅둡시다 👍 : {data.likes}</p>
              {/* 댓글 수 백엔드에 없음 */}
            </StDivComment>
            <StDivContentButton>
              <StBtnView onClick={() => navigate('/')}>
                전체 목록 보기
              </StBtnView>
              <StBtnPostUpdate onClick={() => setContentState(true)}>
                수정
              </StBtnPostUpdate>
              <StBtnPostDelete onClick={() => deleteButton(data.postId)}>
                삭제
              </StBtnPostDelete>
            </StDivContentButton>
          </StDivContentWrap>
        ) : (
          <StDivContentWrap>
            <StDivWriter>
              <StPWriter>작성자 : {data.nickname}</StPWriter>
            </StDivWriter>
            <StDivTitle>
              <StInputTitle
                onChange={onChangeInputTitleHandler}
                type="text"
                defaultValue={data.title}
                placeholder="제목을 수정해주세요!"
              />
            </StDivTitle>
            <StDivContent>
              <StTextareaContent
                onChange={onChangeTextareaContentHandler}
                type="text"
                defaultValue={data.content}
                placeholder="내용을 수정해주세요!"
              />
            </StDivContent>
            <StDivContentButton>
              <StBtnSave onClick={() => saveButton(data.postId, inputTitle, inputContent)}>저장</StBtnSave>
            </StDivContentButton>
          </StDivContentWrap>
        )}
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

const StInputTitle = styled.input`
  width: 520px;
  height: 18px;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.4);
`;
const StTextareaContent = styled.textarea`
  width: 520px;
  height: 375px;
  margin: auto;
  padding: 10px;
  border-radius: 10px;
`;
const StBtnSave = styled(StBtnPostDelete)`
  margin: 20px 20px 10px auto;
`;
