import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 쿠키에
export const setCookie = () => {
  return cookies.set();
};
export const getCookie = () => {
  return cookies.get();
};
export const removeCookie = () => {
  return cookies.remove();
};

// 토큰 저장
// async의 try 안에 넣기
export const handleLogin = async () => {
  try {
    const data = await axios.post('http://13.209.86.39:3003/api/login', state, {
      withCredentials: true,
    });
    const jwtToken = data.data      // 받아온 토큰 위치 지정

    // jwtToken을 userToken으로 지정 => 쿠키에 토큰 저장
    setCookie('userToken', jwtToken);
    const decodedUserInfo = jwt_decode(jwtToken);   // 토큰 decode

    // 토큰에 저장되어있는 userInfo 저장
    localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo));
    alert('로그인 성공!');
    return response;
  } catch {
    alert('문제 있음');
  }
};

const jwtToken = data.token; // 받아온 토큰 위치 지정
if (jwtToken) {
  setCookie('loginToken', token, {
    path: '/', // 쿠키의 값을 저장하는 서버 경로
    secure: true, // https로 통신할 때만 쿠키가 저장
    sameSite: 'none', //
    // expires : 쿠키 만료 시간으로 Date 객체를 받음
    // httpOnly : document.cookie와 같은 자바스크립트 코드로 쿠키에 비정상적인 접근 X
  });
}

// 토큰 삭제하는 방법
removeCookie('쿠키 이름')

// axios 부분
export const addComment = async ({ id, newContent }) => {
  await axios.post(
    `${process.env.REACT_APP_SERVER}/api/posts/${id}/comments`,
    newContent,
    {
      headers: {
        Authorization: `Bearer ${getCookie('jwtToken')}`,
      },
    }
  );
};


// user 정보 저장
// export const getUser = () => {
//     const userInfo =
//       localStorage.getItem('userInfo') && getCookie('accessJwtToken')
//         ? JSON.parse(localStorage.getItem('userInfo')!)
//         : null;
//     return userInfo;
//   };
  
//   export const removeUser = () => {
//     removeCookie('accessJwtToken');
//     localStorage.clear();
//   };