import { useNavigate } from 'react-router-dom';
import '../../styles/Intros/IntroHeader.css';
export default function IntroHeader() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <header className="intro-header">
      <img src="/img/logo_full.png" alt="logo-image"></img>
      <button onClick={handleClick}>로그인</button>
    </header>
  );
}
