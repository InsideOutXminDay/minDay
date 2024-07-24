import { useNavigate } from 'react-router-dom';
import '../../styles/Intros/IntroHeader.css';
import { useState } from 'react';
export default function IntroHeader({ token, logout, authUser }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };
  const goHome = () => {
    navigate(`/home/${authUser}`);
  };
  return (
    <header className="intro-header">
      <img src="/img/logo_full.png" alt="logo-image"></img>
      <div className="intro-header-btns">
        {token && (
          <button className="intro-header-logout" onClick={logout}>
            로그아웃
          </button>
        )}
        {token && (
          <button className="intro-header-home" onClick={goHome}>
            홈
          </button>
        )}
        {!token && (
          <button className="intro-header-login" onClick={handleClick}>
            로그인
          </button>
        )}
      </div>
    </header>
  );
}
