import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from '../api/comment/commentapi';

function Comments() {
  const params = useParams(); // props로 data를 내려주면 안 될듯
  // params => {id : 1}

  const { isLoading, isError, data } = useQuery('comments', () => {
    return getComments(params.id);
  });

  // 댓글 추가
  const [content, setContent] = useState('');

  const onChangeCommentHandler = (e) => {
    setContent(e.target.value);
  };

  // 댓글 수정
  const [comment, setComment] = useState(data?.content);
  const [commentState, setCommentState] = useState(null);

  // 코드 분석해보기
  const commentToggleHandler = async (commentId) => {
    setCommentState((prev) => Number(commentId));
  };

  const onChangeUpdateComment = (e) => {
    setComment(e.target.value);
  };

  // 리액트 쿼리
  const queryClient = useQueryClient();

  // 추가하는 리액트 쿼리
  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  // 댓글 수정하는 리액트 쿼리
  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
    onError: (err) => {
      if (err.response.status === 403) {
        alert('자신이 작성한 댓글만 수정할 수 있습니다');
      }
    },
  });

  // 댓글 삭제하는 리액트 쿼리
  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
    onError: (err) => {
      if (err.response.status === 403) {
        alert('자신이 작성한 댓글만 수정할 수 있습니다');
      }
    },
  });

  // 댓글 추가 버튼
  const addCommentButton = (id, content) => {
    if (content !== '') {
      const newContent = {
        comment: content,
      };
      alert('댓글이 추가되었습니다!');
      setContent('');

      addCommentMutation.mutate({ id, newContent });
    } else {
      alert('댓글을 입력해주세요');
    }
  };

  // 댓글 삭제 버튼
  const deleteCommentButton = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      deleteCommentMutation.mutate(id);
    } else {
      return;
    }
  };

  // 댓글 수정 -> 저장 버튼
  const updateCommentButton = (id, content) => {
    if (window.confirm('정말 수정하시겠습니까?') === true) {
      setCommentState(null);
      updateCommentMutation.mutate({ id, content });
    } else {
      return;
    }
  };

  // 댓글 수정 취소 버튼
  const commentCencleButton = () => {
    if (window.confirm('정말 취소하시겠습니까?') === true) {
      setCommentState(null);
    } else {
      return;
    }
  };

  if (isLoading) return <h1>로딩중</h1>;
  if (isError) return <h1>에러 발생</h1>;
  console.log(data);

  return (
    <StDivWrap>
      {/* 댓글 작성 */}
      <StDivAddcomment>
        <StInputAddcommnet
          onChange={onChangeCommentHandler}
          value={content}
          placeholder="댓글을 입력해주세요"
        />
        <StBtnAddcomment onClick={() => addCommentButton(params.id, content)}>
          작성
        </StBtnAddcomment>
      </StDivAddcomment>
      {/* 댓글들 */}
      <StDivCommentsWrap>
        {data.map((comments) => {
          return (
            <StDivCommentContainer key={comments.commentId}>
              <StPNickname>{comments.nickname} : </StPNickname>
              {commentState !== comments.commentId ? (
                <>
                  <StPComment>{comments.comment}</StPComment>
                  <StBtnUpdateComment
                    onClick={() => commentToggleHandler(comments.commentId)}
                  >
                    수정
                  </StBtnUpdateComment>
                  <StBtnUpdateComment
                    onClick={() => deleteCommentButton(comments.commentId)}
                  >
                    삭제
                  </StBtnUpdateComment>
                </>
              ) : (
                <>
                  <StInputUpdateComment
                    type="text"
                    defaultValue={comments.comment}
                    onChange={onChangeUpdateComment}
                    placeholder="댓글을 수정해주세요!"
                  />
                  <StBtnUpdateComment onClick={commentCencleButton}>
                    취소
                  </StBtnUpdateComment>
                  <StBtnUpdateComment
                    onClick={() =>
                      updateCommentButton(comments.commentId, comment)
                    }
                  >
                    저장
                  </StBtnUpdateComment>
                </>
              )}
            </StDivCommentContainer>
          );
        })}
      </StDivCommentsWrap>
    </StDivWrap>
  );
}

export default Comments;

const StDivWrap = styled.div`
  width: 600px;
  margin: 0px auto 400px auto;
  padding: 20px;
  border: 2px solid #626FC2;
  border-radius: 10px;
`;
const StDivAddcomment = styled.div`
  background-color: #5D93AB;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
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
  background-color: #9EB3C2;
`;
const StDivCommentsWrap = styled.div`
  margin-top: 20px;
  padding: 10px;
`;
const StDivCommentContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StPNickname = styled.p`
  width: 100px;
  text-align: center;
`;
const StPComment = styled.p`
  width: 300px;
  margin: 20px;
  font-size: 14px;
`;
const StBtnUpdateComment = styled.button`
  width: 70px;
  height: 30px;
  background-color: #1C7293;
  border: none;
  border-radius: 10px;
  margin-left: auto;
  margin-right: 10px;
  transition: 0.15s ease-in-out;
  color: white;
  :hover {
    cursor: pointer;
    background-color: #1E2554;
    color: #e8d5c4;
  }
`;
const StInputUpdateComment = styled.input`
  width: 310px;
  height: 10px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

{
  /* <StDivCommentsWrap>
  {data.map((comments) => {
    return (
      <StDivCommentContainer key={comments.commentId}>
        <StPNickname>{comments.nickname} : </StPNickname>
        <StPComment>{comments.content}</StPComment>
        <StBtnUpdateComment onClick={() => setCommentState(comments.commentId)}>
          수정
        </StBtnUpdateComment>
        <StBtnUpdateComment onClick={() => deleteCommentButton(0)}>
          삭제
        </StBtnUpdateComment>
      </StDivCommentContainer>
    );
  })}
</StDivCommentsWrap>; */
}

{
  /* <StDivCommentsWrap>
  {data.map((comments) => {
    return (
      <StDivCommentContainer key={comments.commentId}>
        <StPNickname>{comments.nickname} : </StPNickname>
        <StInputUpdateComment
          type="text"
          defaultValue={comments.content}
          onChange={onChangeUpdateComment}
        />

        <StBtnUpdateComment onClick={() => setCommentState(0)}>
          저장
        </StBtnUpdateComment>
      </StDivCommentContainer>
    );
  })}
</StDivCommentsWrap>; */
}
