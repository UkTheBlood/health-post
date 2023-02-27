// 게시물 조회, 수정, 삭제, 등록 api 모음

import axios from 'axios';

// 게시물 조회        /api/posts
const getPosts = async () => {
  const response = await axios.get('http://13.209.86.39:3003/api/posts');
  return response.data.posts;
};

// 상세 게시물 조회   api/posts/:${postId}
const getDetailPost = async (id) => {
  const postId = Number(id);
  const detailresponse = await axios.get(
    `http://13.209.86.39:3003/api/posts/${postId}`
  );
  return detailresponse.data.post;
};

// 게시물 추가    /api/posts (O)
const addPost = async (newPost) => {
  await axios.post('http://13.209.86.39:3003/api/posts', newPost, {
    'Content-Type': 'multipart/form-data',
  });
};

// 게시물 삭제    /api/posts/:postId (O)
const deletePost = async (id) => {
  const postId = Number(id);
  await axios.delete(`http://13.209.86.39:3003/api/posts/${postId}`);
};

// 게시물 수정    /api/posts/:postId (O)
const updatePost = async ({ id, inputTitle, inputContent }) => {
  // 받아올 때도 중괄호
  await axios.put(`http://13.209.86.39:3003/api/posts/${id}`, {
    title: `${inputTitle}`,
    content: `${inputContent}`,
  });
};

// 좋아요 기능    /api/likes/posts/:postId (O)
const likeUp = async (id) => {
  const postId = Number(id);
  await axios.put(`http://13.209.86.39:3003/api/likes/posts/${postId}`);
};

export { getPosts, addPost, deletePost, getDetailPost, updatePost, likeUp };
