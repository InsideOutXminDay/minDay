import React, { useState, useEffect, useReducer } from 'react';
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
//import Login from './pages/Login.js';
import LoginForm from './components/Auth/LoginForm.js';
import SignUp from './pages/SignUp.js';
import axios from 'axios';

// diary 데이터
import Ask from './pages/Ask.js';

function App() {
  //인증 관련
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setAuthToken(token);
      window.history.replaceState({}, document.title, window.location.pathname); // remove token from URL
    }
  }, []);

  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['authorization'];
    }
    setToken(token);
  };

  const handleLogout = () => {
    setAuthToken('');
  };

  return (
    <BrowserRouter>
      <div className="App">
        {token && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home token={token} />} />{' '}
          {/* /home/:userid >> 개인별 홈화면 구현 */}
          {
            <Route
              path="/login"
              element={<LoginForm setToken={setAuthToken} />}
            />
          }
          {<Route path="/join" element={<SignUp />} />}
          <Route path="/ask" element={<Ask />} /> {/* /ask/:id */}
          {/* <Route path='/find' element={<회원정보 찾기 />}/> */}
          <Route path="/diary/:id" element={<Diary token={token} />} />{' '}
          {/* /diary/:id */}
          <Route path="/newdiary" element={<NewDiary />} /> {/* /diary/:id */}
          <Route path="/contents" element={<Contents />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/post" element={<Post />} />
          <Route path="/mind" element={<Mind />} />
          <Route path="/new/:id" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
