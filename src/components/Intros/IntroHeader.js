import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/Intros/IntroHeader.css';
export default function IntroHeader({ token, logout }) {
  const navigate = useNavigate();
  const userId = useParams();

  const handleClick = () => {
    navigate('/login');
  };
  const goHome = () => {
    navigate(`/home/${userId.id}`);
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
