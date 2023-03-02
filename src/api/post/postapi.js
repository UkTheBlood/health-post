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
const addPost = async (formData) => {
  await axios.post(`${process.env.REACT_APP_SERVER}/api/posts`, formData, {
    headers: {
      authorization: `Bearer ${getCookie('userToken')}`,
      'Content-Type': 'multipart/form-data',
    },
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
  const detailresponse = await axios.get(
    `${process.env.REACT_APP_SERVER}/api/posts/${postId}`,
    {
      headers: {
        authorization: `Bearer ${getCookie('userToken')}`,
      },
    }
  );
  return detailresponse.data.data;
};

// 게시물 삭제
const deletePost = async (id) => {
  const postId = Number(id);
  await axios.delete(`${process.env.REACT_APP_SERVER}/api/posts/${postId}`, {
    headers: {
      authorization: `Bearer ${getCookie('userToken')}`,
    },
  });
};

// 게시물 수정
const updatePost = async ({ id, formData }) => {
  // 받아올 때도 중괄호
  await axios.patch(
    `${process.env.REACT_APP_SERVER}/api/posts/${id}`,
    {
      formData
    },
    // header
    {
      headers: {
        authorization: `Bearer ${getCookie('userToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

// 좋아요 기능
const likeUp = async (id) => {
  const postId = Number(id);
  await axios.put(
    `${process.env.REACT_APP_SERVER}/api/likes/posts/${postId}`,
    {},
    {
      headers: {
        authorization: `Bearer ${getCookie('userToken')}`,
      },
    }
  );
};

export { getPosts, addPost, deletePost, getDetailPost, updatePost, likeUp };
