import React, { useState } from 'react';
import styled from 'styled-components';

function Write() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onChangeTitleHandler = (e) => {
        setTitle(e.target.value)
    }
    const onChangeContentHandler = (e) => {
        setContent(e.target.value)
    }

    // 리액트 쿼리
    

  return (
    <StDivWrap>
      <div>
        <p>게시글 닉네임 : 작성자</p>
        <StPText>게시글 제목</StPText>
        <StInputTitle 
            onChange={onChangeTitleHandler}
            value={title}
            type='text'
            placeholder='게시글 제목을 입력해주세요'
        />
        <br />
        <StPText>게시글 내용</StPText>
        <StTextContent 
            onChange={onChangeContentHandler}
            value={content}
            type='text'
            placeholder='게시글 내용을 입력해주세요'
        />
        <StDivSave>
            <StBtnSave>저장</StBtnSave>
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
`
const StInputTitle = styled.input`
    width: 90%;
    height: 20px;
    padding: 10px;
    margin: auto;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
`
const StTextContent = styled.textarea`
    width: 90%;
    height: 500px;
    padding: 10px;
    margin: auto;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    font-size: 16px;
`
const StDivSave = styled.div`
`
const StBtnSave = styled.button`
    width: 150px;
    height: 40px;
    margin: 20px 0px 0px 0px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: aliceblue;
`