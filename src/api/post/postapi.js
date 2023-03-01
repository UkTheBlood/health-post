// 게시물 조회, 수정, 삭제, 등록 api 모음

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../until/cookie';


export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    authorization: `Bearer ${getCookie('userToken')}`,
  },
});

// 게시물 추가
const addPost = async (newPost) => {
  await axios.post(`${process.env.REACT_APP_SERVER}/api/posts`, newPost, {
    // 'Content-Type': 'multipart/form-data',
    headers: {
      authorization: `Bearer ${getCookie('userToken')}`,
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
  const detailresponse = await axios
    .get(`${process.env.REACT_APP_SERVER}/api/posts/${postId}`, {
      headers: {
        authorization: `Bearer ${getCookie('userToken')}`,
      },
    })
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
      // alert(err.response.data.message);
      // const navigate = useNavigate()
      // navigate('/')
      // console.log(err.response.status)
      // if(err.response.status === 401) {
      //   alert("로그인 후에 이용 가능합니다")
      // }
    // });
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
const updatePost = async ({ id, inputTitle, inputContent, image }) => {
  // 받아올 때도 중괄호
  await axios.put(
    `${process.env.REACT_APP_SERVER}/api/posts/${id}`,
    {
      title: `${inputTitle}`,
      content: `${inputContent}`,
      // image: image,
    },
    // header
    {
      // 'Content-Type': 'multipart/form-data',
      headers: {
        authorization: `Bearer ${getCookie('userToken')}`,
      },
    }
  );
};

// 좋아요 기능
const likeUp = async (id) => {
  const postId = Number(id);
  console.log(postId);
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
