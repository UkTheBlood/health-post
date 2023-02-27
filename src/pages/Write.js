import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addPost } from '../api/post/postapi';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContentHandler = (e) => {
    setContent(e.target.value);
  };

  // 이미지 첨부 input onChange 함수
  const imageSubmitHandler = (e) => {
    setImage(() => e.target.files[0]);
    const formData = new FormData();
    formData.append('image', image);
    console.log('formData', formData);
    console.log('inside image', image);
    for (const keyValue of formData) console.log("keyValue", keyValue);
  };
  console.log('outside image', image);

  // navigate
  const navigate = useNavigate();

  // 취소
  const cancelButton = () => {
    if (window.confirm('취소하시겠습니까? 홈 화면으로 돌아갑니다.')) {
      navigate('/');
    } else {
      return;
    }
  };

  // 리액트 쿼리
  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  // 추가 버튼
  const addButton = () => {
    if (title !== '' && content !== '') {
      const newPost = {
        title,
        content,
        image,
      };
      alert('게시글이 추가되었습니다!');

      setTitle('');
      setContent('');
      navigate('/');
      mutation.mutate(newPost);
    } else {
      alert('제목과 내용을 모두 입력해주세요!!');
    }
  };

  return (
    <StDivWrap>
      <div>
        <p>게시글 닉네임 : 작성자</p>
        <StPText>게시글 제목</StPText>
        <StInputTitle
          onChange={onChangeTitleHandler}
          value={title}
          type="text"
          placeholder="게시글 제목을 입력해주세요"
        />
        <br />
        <StPText>게시글 내용</StPText>
        <StTextContent
          onChange={onChangeContentHandler}
          value={content}
          type="text"
          placeholder="게시글 내용을 입력해주세요"
        />
        {/* 체인지인지 클릭인지 */}
        <input onChange={imageSubmitHandler} id="file" type="file" />
        <StDivSave>
          <StBtnCancel onClick={cancelButton}>취소</StBtnCancel>
          <StBtnSave onClick={addButton}>저장</StBtnSave>
        </StDivSave>
      </div>
    </StDivWrap>
  );
}

export default Write;

const StDivWrap = styled.div`
  margin: 30px;
`;

const StPText = styled.p`
  font-size: 22px;
  font-weight: 530;
`;
const StInputTitle = styled.input`
  width: 90%;
  height: 20px;
  padding: 10px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;
const StTextContent = styled.textarea`
  width: 90%;
  height: 500px;
  padding: 10px;
  margin: auto;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 16px;
`;
const StDivSave = styled.div`
  text-align: right;
  margin-right: 40px;
`;
const StBtnSave = styled.button`
  width: 150px;
  height: 40px;
  margin: 20px 0px 0px 0px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: aliceblue;
`;
const StBtnCancel = styled.button`
  width: 150px;
  height: 40px;
  margin: 20px 40px 0px 0px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: aliceblue;
`;
