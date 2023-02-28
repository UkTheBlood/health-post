// 게시물 조회, 수정, 삭제, 등록 api 모음

import axios from 'axios';
import { getCookie } from '../../until/cookie';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    authorization: `Bearer ${getCookie('userToken')}`,
  },
});

// 게시물 추가
const addPost = async (newPost) => {
  await instance.post(`/api/posts`, newPost, {
    'Content-Type': 'multipart/form-data',
  });
};

// 게시물 목록 조회
const getPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/posts`);
  return response.data.data;
};

// 상세 게시물 조회
const getDetailPost = async (id) => {
  const postId = Number(id);
  const detailresponse = await axios.get(`${process.env.REACT_APP_SERVER}/api/posts/${postId}`, {
    headers: {
      authorization: `Bearer ${getCookie('userToken')}`,
    }
  });
  console.log("detailresponse", detailresponse)
  return detailresponse.data.data;
};

// console.log("getCookie", getCookie('userToken'))

// 게시물 삭제
const deletePost = async (id) => {
  const postId = Number(id);
  await instance.delete(`/api/posts/${postId}`);
};

// 게시물 수정
const updatePost = async ({ id, inputTitle, inputContent, image }) => {
  // 받아올 때도 중괄호
  await instance.put(
    `/api/posts/${id}`,
    {
      title: `${inputTitle}`,
      content: `${inputContent}`,
      image: image,
    },
    // header
    {
      'Content-Type': 'multipart/form-data',
    }
  );
};

// 좋아요 기능
const likeUp = async (id) => {
  const postId = Number(id);
  await instance.put(`/api/likes/posts/${postId}`);
};

export { getPosts, addPost, deletePost, getDetailPost, updatePost, likeUp };
