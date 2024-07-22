import React,{ useReducer } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Post from './pages/post';
import Mind from './pages/mind';
import New from './pages/new';
import Edit from './pages/edit';
import Detail from './pages/detail';
import Home from './pages/Home';
import Diary from './pages/Diary';
import NewDiary from './pages/NewDiary.js';
import SettingPage from './pages/SettingPage.js';
import Intro from './pages/Intro.js';
import Contents from './pages/Contents.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';

// diary 데이터
import Ask from './pages/Ask.js';


function App() {





  return (
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} />{' '}
            {/* /home/:userid >> 개인별 홈화면 구현 */}
            {<Route path="/login" element={<Login />} />}
            {<Route path="/join" element={<SignUp />} />}
            <Route path='/ask' element={<Ask />}/> {/* /ask/:id */}
            {/* <Route path='/find' element={<회원정보 찾기 />}/> */}
            <Route path='/diary/:id' element={<Diary />}/>  {/* /diary/:id */}
            <Route path='/newdiary' element={<NewDiary />}/>  {/* /diary/:id */}
            <Route path="/contents" element={<Contents />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path='/post' element={<Post />}/>
            <Route path='/mind' element={<Mind />}/>
            <Route path='/new/:id' element={<New />}/>
            <Route path='/edit/:id' element={<Edit />}/>
            <Route path='/detail/:id' element={<Detail />}/>
          </Routes>
        </div>
      </BrowserRouter>


  );
}

export default App;
