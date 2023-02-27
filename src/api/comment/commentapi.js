// 댓글 조회, 추가, 삭제, 수정 api 모음
// http://13.209.86.39:3003
// https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io

import axios from 'axios';

// 댓글 조회 기능       /api/posts/:postId/comments
export const getComments = async (id) => {
  const response = await axios.get( `https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/posts/${id}/comments`); 
  return response.data.comments;
};

// 댓글 추가 기능       /api/posts/:postId/comments
export const addComment = async ({id, newContent }) => {
  await axios.post(`https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/posts/${id}/comments`, newContent);
};

// 댓글 삭제 기능       /api/comments/:commentId
export const deleteComment = async (id) => {
    await axios.delete(`https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/comments/${id}`)
}


// 댓글 수정 기능       /api/comments/:commentId
export const updateComment = async ({id, content}) => {
  await axios.put(`https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/comments/${id}`, {
    content : `${content}`
  })
}