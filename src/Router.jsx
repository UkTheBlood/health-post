import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './pages/Detail';
import Header from './pages/Header';
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';
import Write from './pages/Write';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/write' element={<Write />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
