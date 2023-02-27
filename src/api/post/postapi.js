// 게시물 조회, 수정, 삭제, 등록 api 모음

// https://bc91bf5e-9081-4e01-a1c1-00f5792f2bca.mock.pstmn.io
// http://13.209.86.39:3003

import axios from 'axios';

// 게시물 조회        /api/posts
const getPosts = async () => {
  const response = await axios.get(
    'https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/posts'
  );
  console.log("response", response)
  return response.data.data
};

// 상세 게시물 조회   api/posts/:${postId}
const getDetailPost = async (id) => {
  const postId = Number(id);
  const detailresponse = await axios.get(
    `https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/posts/1`
  );
  // console.log(detailresponse)
  return detailresponse.data.data;
};

// 게시물 추가    /api/posts (O)
const addPost = async (newPost) => {
  await axios.post(
    'https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/posts',
    newPost,
    {
      'Content-Type': 'multipart/form-data',
    }
  );
};

// 게시물 삭제    /api/posts/:postId (O)
const deletePost = async (id) => {
  const postId = Number(id);
  await axios.delete(
    `https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/posts/${postId}`
  );
};

// 게시물 수정    /api/posts/:postId (O)
const updatePost = async ({ id, inputTitle, inputContent }) => {
  // 받아올 때도 중괄호
  await axios.put(
    `https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/posts/${id}`,
    {
      title: `${inputTitle}`,
      content: `${inputContent}`,
    }
  );
};

// 좋아요 기능    /api/likes/posts/:postId (O)
const likeUp = async (id) => {
  const postId = Number(id);
  await axios.put(`https://478e2b2f-81a1-41f5-9f8d-3748e8184bd0.mock.pstmn.io/api/likes/posts/${postId}`);
};

export { getPosts, addPost, deletePost, getDetailPost, updatePost, likeUp };
