// 댓글 조회, 추가, 삭제, 수정 api 모음
import axios from 'axios';
import { getCookie } from '../../until/cookie';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    Authorization: `Bearer ${getCookie('userToken')}`,
  },
});

// 댓글 조회 기능
export const getComments = async (id) => {
  const response = await instance.get(`/api/posts/${id}/comments`);
  return response.data.comments;
};

// 댓글 추가 기능
export const addComment = async ({ id, newContent }) => {
  await instance.post(`/api/posts/${id}/comments`, newContent);
};

// 댓글 수정 기능       /api/comments/:commentId
export const updateComment = async ({ id, content }) => {
  await instance.put(`/api/comments/${id}`, {
    content: `${content}`,
  });
};

// 댓글 삭제 기능
export const deleteComment = async (id) => {
  await instance.delete(`/api/comments/${id}`);
};
