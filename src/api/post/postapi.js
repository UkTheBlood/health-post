// 게시물 조회, 수정, 삭제, 등록 api 모음

// 예시 api http://13.209.86.39:3000/api/posts/1/comments

import axios from 'axios';

// 게시물 조회
const getPosts = async () => {
  const response = await axios.get('http://13.209.86.39:3003/api/posts'); //  "/api/posts"
  return response.data.posts;
};

// 상세 게시물 조회
const getDetailPost = async (id) => {
  const postId = Number(id)
  const detailresponse = await axios.get(`http://13.209.86.39:3003/api/posts/${postId}`);   // "api/posts/:${postId}"
  return detailresponse.data.post
}

// 게시물 추가
const addPost = async (newPost) => {
  await axios.post('http://13.209.86.39:3003/api/posts', newPost); //  "/api/posts"
};

// 게시물 삭제
const deletePost = async (id) => {
  const postId = Number(id)
  await axios.delete(`http://13.209.86.39:3003/api/posts/${postId}`); //  "/api/posts/:postId"
};

// 게시물 수정
const updatePost = async ({id, inputTitle, inputContent}) => {  // 받아올 때도 중괄호
  await axios.put(`http://13.209.86.39:3003/api/posts/${id}`, {
    title : `${inputTitle}`,
    content : `${inputContent}`,
  })
}

export { getPosts, addPost, deletePost, getDetailPost, updatePost };
