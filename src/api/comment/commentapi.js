import axios from 'axios';

// 댓글 조회 기능       /api/posts/:postId/comments
export const getComments = async (id) => {
  const response = await axios.get( `http://13.209.86.39:3003/api/posts/${id}/comments`); 
  return response.data.comments;
};

// 댓글 추가 기능       /api/posts/:postId/comments
export const addComment = async ({id, newContent }) => {
  await axios.post(`http://13.209.86.39:3003/api/posts/${id}/comments`, newContent);
};

// 댓글 삭제 기능       /api/comments/:commentId
export const deleteComment = async (id) => {
    await axios.delete(`http://13.209.86.39:3003/api/comments/${id}`)
}


// 댓글 수정 기능       /api/comments/:commentId
export const updateComment = async ({id, content}) => {
  await axios.put(`http://13.209.86.39:3003/api/comments/${id}`, {
    content : `${content}`
  })
}