import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addPost, getPosts } from '../api/post/postapi';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const onChangeTitleHandler = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContentHandler = (e) => {
    setContent(e.target.value);
  };

  // 이미지 첨부 input onChange 함수
  const imageSubmitHandler = (e) => {
    setImage(() => e.target.files[0]);
  };

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
    onError: (error) => {
      // 콜백함수 인자 : error 인자가 있음
      console.log();
      if (error.response.status === 401) {
        alert('게시물 작성에 실패했습니다. 회원가입 후 이용 가능합니다');
      }
    },
  });

  // const { isLoading, isError, data } = useQuery('posts', getPosts);

  // 추가 버튼
  const addButton = () => {
    if (title !== '' && content !== '') {
      const formData = new FormData();
      if (image !== null) {
        formData.append('image', image);
        formData.append(
          'title',
          title
          // new Blob([JSON.stringify(title)], {
          //   type: 'application/json',
          // })
        );
        formData.append(
          'content',
          content
          // new Blob([JSON.stringify(content)], {
          //   type: 'application/json',
          // })
        );
        // console.log('formData', formData.get('image'));
        // console.log('inside image', image);

        // for (const keyValue of formData) console.log('keyValue', keyValue);
        setTitle('');
        setContent('');
        navigate('/');
        mutation.mutate(formData);
        alert('홈 화면으로 돌아갑니다');
      } else {
        formData.append('title', title);
        formData.append('content', content);

        setTitle('');
        setContent('');
        navigate('/');
        mutation.mutate(formData);
        alert('홈 화면으로 돌아갑니다');
      }
    } else {
      alert('제목과 내용을 모두 입력해주세요!!');
    }
  };

  // if(isLoading) return <h1>로딩중...</h1>
  // if(isError) return <h1>error 발생...</h1>

  // console.log(data)

  return (
    <StDivWrap>
      <div>
        <p>게시글 닉네임 : 작성자</p>
        <StPText>게시글 제목</StPText>
        {/* <form encType='multipart/form-data'> */}
        <StInputTitle
          name="title"
          onChange={onChangeTitleHandler}
          value={title}
          type="text"
          placeholder="게시글 제목을 입력해주세요"
        />
        <br />
        <StPText>게시글 내용</StPText>
        <StTextContent
          name="content"
          onChange={onChangeContentHandler}
          value={content}
          type="text"
          placeholder="게시글 내용을 입력해주세요"
        />
        {/* 체인지인지 클릭인지 */}
        <StLabelImg htmlFor="contained-button-file" className="m-0 w-100">
          <StInputImg
            name="image"
            onChange={imageSubmitHandler}
            id="file"
            type="file"
          />
        </StLabelImg>
        <StDivSave>
          <StBtnCancel onClick={cancelButton}>취소</StBtnCancel>
          <StBtnSave onClick={addButton}>저장</StBtnSave>
        </StDivSave>
        {/* </form> */}
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
const StInputImg = styled.input`
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 78%;
  color: #999999;
`;
const StLabelImg = styled.label`
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  cursor: pointer;
  height: 40px;
  margin-left: 10px;
`;
