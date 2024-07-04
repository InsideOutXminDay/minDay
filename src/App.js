import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Post from './pages/post';
import Home from './pages/Home';
import SettingPage from './pages/SettingPage.js';
import Intro from './pages/Intro.js';
import Login from './pages/Login.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {<Route path="/" element={<Intro />} />}
          <Route path="/home" element={<Home />} />{' '}
          {/* /home/:userid >> 개인별 홈화면 구현 */}
          {<Route path="/login" element={<Login />} />}
          {/* <Route path='/join' element={<회원가입 />}/> */}
          {/* <Route path='/ask' element={<설문 />}/> */}
          {/* <Route path='/find' element={<회원정보 찾기 />}/> */}
          {/* <Route path='/diary/:id' element={<일기 수정 />}/> */}
          {/* <Route path='/category' element={<컨텐츠 카테고리/>}/> */}
          {/* <Route path='/contents' element={<컨텐츠 보기 />}/> */}
          {/* <Route path='/contents/:id' element={<컨텐츠 상세/>}/> */}
          <Route path="/setting" element={<SettingPage />} />
          {/* <Route path='/mind' element={<커뮤니티-고민/>}/> */}
          {/* <Route path='/post' element={<커뮤니티-일반/>}/> */}
          {/* <Route path='/new/:id' element={<게시글 작성 />}/> */}
          {/* <Route path='/detail/:id' element={<게시글 상세 />}/> */}
          {/* <Route path='/edit/:id' element={<게시글 수정 />}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
