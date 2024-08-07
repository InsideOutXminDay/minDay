import React, { useState, useEffect, useReducer } from 'react';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
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
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

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
    setAuthUser(null);
    localStorage.removeItem('authUser');
    navigate('/');
  };
  const handleLogin = (userId) => {
    console.log('로그인한 사용자 식별번호: ', userId);
    setAuthUser(userId);
  };
  useEffect(() => {
    if (authUser) {
      localStorage.setItem('authUser', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [authUser]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Intro token={token} logout={handleLogout} authUser={authUser} />
          }
        />
        <Route
          path="/home/:id"
          element={<Home token={token} logout={handleLogout} />}
        />{' '}
        {
          <Route
            path="/login"
            element={
              <LoginForm setToken={setAuthToken} onLogin={handleLogin} />
            }
          />
        }
        {<Route path="/join" element={<SignUp />} />}
        <Route path="/ask/:id" element={<Ask token={token} />} />{' '}
        <Route
          path="/diary/:id"
          element={<Diary token={token} logout={handleLogout} />}
        />{' '}
        <Route
          path="/newdiary"
          element={<NewDiary token={token} logout={handleLogout} />}
        />{' '}
        <Route
          path="/contents"
          element={<Contents token={token} logout={handleLogout} />}
        />{' '}
        <Route
          path="/setting/:id"
          element={<SettingPage token={token} logout={handleLogout} />}
        />
        <Route
          path="/post"
          element={<Post token={token} logout={handleLogout} />}
        />
        <Route
          path="/mind"
          element={<Mind token={token} logout={handleLogout} />}
        />
        <Route
          path="/new/:id"
          element={<New token={token} logout={handleLogout} />}
        />
        <Route
          path="/edit/:id"
          element={<Edit token={token} logout={handleLogout} />}
        />
        <Route
          path="/detail/:id"
          element={<Detail token={token} logout={handleLogout} />}
        />
      </Routes>
    </div>
  );
}

const MainApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default MainApp;
