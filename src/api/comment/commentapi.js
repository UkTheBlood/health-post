import axios from 'axios';

// 댓글 조회 기능
export const getComments = async (id) => {

  const response = await axios.get( `http://13.209.86.39:3003/api/posts/${id}/comments`);
  return response.data.comments;
};

// 댓글 추가 기능
export const addComment = async ({id, newContent }) => {
  await axios.post(`http://13.209.86.39:3003/api/posts/${id}/comments`, newContent);
};

// 댓글 삭제 기능

// 댓글 수정 기능
