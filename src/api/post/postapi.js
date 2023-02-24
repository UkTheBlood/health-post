// 게시물 조회, 수정, 삭제, 등록 api 모음

// 예시 api http://13.209.86.39:3000/api/posts/1/comments

import axios from 'axios';

// 게시물 조회
const getPosts = async () => {
  const response = await axios.get('http://13.209.86.39:3000/api/posts'); //  "/api/posts"
  return response.data;
};

// 게시물 추가
const addPost = async (newPost) => {
  await axios.post('http://13.209.86.39:3000/api/posts', newPost); //  "/api/posts"
};

// 게시물 삭제
const deletePost = async (id) => {
  await axios.delete(''); //  "/api/posts/:postId"
};
