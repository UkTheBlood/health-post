import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  deletePost,
  getDetailPost,
  updatePost,
  likeUp,
} from '../api/post/postapi';
import Comments from '../coponents/Comments';

// React => useMutation => await Axios => BE(Error) => await Axios => useMutation

function Detail() {
  const param = useParams(); // param -> url의 id(string)
  const navigate = useNavigate();

  const [contentState, setContentState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [image, setImage] = useState('');

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

  const [inputTitle, setInputTitle] = useState(data?.title);
  const [inputContent, setInputContent] = useState(data?.content);

  // React Query 부분
  const queryClient = useQueryClient();

  // 삭제 뮤테이션
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: () => {
      alert(isError);
    },
  });

  // 업데이트 뮤테이션
  const updatemutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('detailposts');
    },
  });

  // 좋아요 버튼 뮤테이션
  const likemutation = useMutation(likeUp, {
    onSuccess: () => {
      queryClient.invalidateQueries('detailposts');
    },
  });

  // 좋아요 버튼
  const onClickLikeHandler = (id) => {
    setLikeState(!likeState);
    likemutation.mutate(id);
  };

  // 삭제 버튼
  const deleteButton = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      navigate('/');
      mutation.mutate(id);
    } else {
      return;
    }
  };

  // 취소 버튼
  const cancelButton = () => {
    if (window.confirm('취소하시겠습니까? 이전 화면으로 돌아갑니다.')) {
      setContentState(false);
    } else {
      return;
    }
  };

  // 저장 버튼
  const saveButton = (id, inputTitle, inputContent, image) => {
    if (inputTitle !== '' && inputContent !== '') {
      if (window.confirm('정말 수정하시겠습니까?') === true) {
        setContentState(false);
        updatemutation.mutate({ id, inputTitle, inputContent, image });
      } else {
        return;
      }
    } else {
      alert('제목과 내용을 모두 입력해주세요!');
    }
  };

  const imageSubmitHandler = (e) => {
    setImage(() => e.target.files[0]);
    const formData = new FormData();
    formData.append('image', image);
    console.log('formData', formData);
    console.log('inside image', image);
    for (const keyValue of formData) console.log('keyValue', keyValue);
  };

  if (isLoading) return <h1>로딩중</h1>;
  if (isError) return <h1>에러 발생</h1>;

  const datadate = new Date(data.createdAt).toLocaleDateString('en-us');
  console.log(data);

  return (
    <>
      <div>
        {contentState === false ? (
          <>
            <StDivContentWrap>
              <StDivWriter>
                <StPWriter>작성자 : {data.nickname}</StPWriter>
                <p>{datadate}</p>
              </StDivWriter>
              <StBtnPostUpdate onClick={() => setContentState(true)}>
                수정
              </StBtnPostUpdate>
              <StBtnPostUpdate onClick={() => deleteButton(data.postId)}>
                삭제
              </StBtnPostUpdate>
              <StDivTitle>
                <StH1Title>{data.title}</StH1Title>
              </StDivTitle>
              <hr />
              <StDivContent>
                <StPContent>{data.content}</StPContent>
              </StDivContent>
              <StDivComment>
                <StPCommentsCount>댓글 수 : {data.commentsCount}</StPCommentsCount>
                {likeState === false ? (
                  <>
                    <StPLike onClick={() => onClickLikeHandler(param.id)}>
                      🤍
                    </StPLike>
                    좋아요 : {data.likesCount}
                  </>
                ) : (
                  <>
                    <StPLike onClick={() => onClickLikeHandler(param.id)}>
                      💓{' '}
                    </StPLike>
                    좋아요 : {data.likesCount}
                  </>
                )}
                {/* 댓글 수 백엔드에 없음 */}
              </StDivComment>
              <StDivContentButton>
                <StBtnView onClick={() => navigate('/')}>
                  전체 목록 보기
                </StBtnView>
              </StDivContentButton>
            </StDivContentWrap>
            {/* 댓글 부분 */}
            <Comments />
            {/* 댓글 부분 */}
          </>
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
                // value={inputTitle}
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
            <input onChange={imageSubmitHandler} id="file" type="file" />

            <StDivContentButton>
              <StBtnCancle onClick={cancelButton}>취소</StBtnCancle>
              <StBtnSave
                onClick={() =>
                  saveButton(data.postId, inputTitle, inputContent, image)
                }
              >
                저장
              </StBtnSave>
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
  border: 1px solid rgba(0, 0, 0, 0.3);
`;
const StDivWriter = styled.div`
  display: flex;
`;
const StPWriter = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-right: auto;
`;
const StDivTitle = styled.div`
  width: 550px;
  height: 40px;
  margin: 0px auto;
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
const StH1Title = styled.p`
  font-size: 30px;
`;
const StPContent = styled.p`
  line-height: 20px;
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
  width: 60px;
  height: 20px;
  margin-right: 0px;
  border: none;
  border-radius: 10px;
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  :hover {
    color: black;
  }
`;
const StBtnPostDelete = styled.button`
  width: 60px;
  height: 20px;
  border: none;
  border-radius: 10px;
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
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
const StBtnCancle = styled.button`
  margin: 20px 0px 0px 0px;
  width: 80px;
  height: 40px;
  margin-right: 30px;
  border: none;
  border-radius: 10px;
  background-color: #609966;
`;
const StBtnSave = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #609966;
  margin: 20px 20px 10px auto;
`;
const StPLike = styled.p`
  display: inline;
  width: 100px;
  margin-left: auto;
`;
const StPCommentsCount = styled.p`
  margin-right: 20px;
`