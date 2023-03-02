import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Form, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  deletePost,
  getDetailPost,
  updatePost,
  likeUp,
} from '../api/post/postapi';
import Comments from '../coponents/Comments';
import { getUser } from '../until/localstorage';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// React => useMutation => await Axios => BE(Error) => await Axios => useMutation

// const isSameUser = comment.userId === userID
// isSameUser && <Button></Button>

function Detail() {
  const param = useParams(); // param -> url의 id(string)
  const navigate = useNavigate();

  const [contentState, setContentState] = useState(false);
  const [image, setImage] = useState('');

  const onChangeInputTitleHandler = (e) => {
    setInputTitle(e.target.value);
  };
  const onChangeTextareaContentHandler = (e) => {
    setInputContent(e.target.value);
  };

  const userInfo = getUser();
  // console.log("userInfo", userInfo)

  // getPosts를 사용해 data(posts 배열)를 받아온다
  const { isLoading, isError, data } = useQuery(
    'detailposts',
    () => getDetailPost(param.id),
    {
      onError: (error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          alert('로그인 이후에 사용 가능합니다');
          navigate('/');
        }
      },
    }
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
    onError: (error) => {
      // console.log(error.response.status);
      if (error.response.status === 400) {
        alert('게시글 삭제에 실패했습니다. 삭제할 권환이 없습니다.');
      }
    },
  });

  // 업데이트 뮤테이션
  const updatemutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('detailposts');
    },
    onError: (error) => {
      if (error.response.status === 400) {
        alert('게시글 삭제에 실패했습니다. 삭제할 권환이 없습니다.');
      }
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
        const formData = new FormData();
        formData.append('image', image)
        formData.append('title', inputTitle)
        formData.append('content', inputContent)

        setContentState(false);
        updatemutation.mutate({id, formData});
      } else {
        return;
      }
    } else {
      alert('제목과 내용을 모두 입력해주세요!');
    }
  };

  const imageSubmitHandler = (e) => {
    setImage(() => e.target.files[0]);
  };

  if (isLoading) return <h1>로딩중</h1>;
  if (isError) return <h1>에러 발생</h1>;

  console.log(data.userId);
  console.log(userInfo.userId);

  const datadate = new Date(data.createdAt).toLocaleDateString('en-us');

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
              {data.userId === userInfo.userId ? (
                <>
                  <StBtnPostUpdate onClick={() => setContentState(true)}>
                    수정
                  </StBtnPostUpdate>
                  <StBtnPostUpdate onClick={() => deleteButton(data.postId)}>
                    삭제
                  </StBtnPostUpdate>
                </>
              ) : null}

              <StDivTitle>
                <StH1Title>{data.title}</StH1Title>
              </StDivTitle>
              <hr />
              <StDivContent>
                <StPContent>
                  <StImg src={data.fileUrl}></StImg>
                  {data.content}
                </StPContent>
              </StDivContent>
              <StDivComment>
                <StPCommentsCount>
                  {/* <StPCommentIcon>
                    <FcComments />
                  </StPCommentIcon> */}
                  댓글 : {data.commentsCount}
                </StPCommentsCount>
                {data.likeState === false ? (
                  <>
                    <StPLike onClick={() => onClickLikeHandler(param.id)}>
                      <FaRegHeart />
                    </StPLike>
                    좋아요 : {data.likesCount}
                  </>
                ) : (
                  <>
                    <StPLike onClick={() => onClickLikeHandler(param.id)}>
                      <FaHeart />
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
  border: 3px solid #626fc2;
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
  display: flex;
`;
const StImg = styled.img`
  width: 150px;
  height: 150px;
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
  background-color: #5d93ab;
  color: white;
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
  background-color: #9eb3c2;
  color: white;
`;
const StBtnSave = styled.button`
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: #9eb3c2;
  margin: 20px 20px 10px auto;
  color: white;
`;
const StPLike = styled.p`
  display: inline;
  width: 100px;
  margin-left: auto;
  margin-right: 10px;
  color: red;
`;
const StPCommentIcon = styled.p`
  display: inline;
  margin-right: 10px;
  font-size: 22px;
`;
const StPCommentsCount = styled.p`
  margin-right: 20px;
`;
