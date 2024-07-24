import '../styles/Header.css';
import {
  IoChatbubbleOutline,
  IoBookOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from 'react-icons/io5';
import { BiLike } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
export default function Header({ userId, logout }) {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate(`/home/${userId.id}`);
  };
  const goCommunityMind = () => {
    navigate('/mind', { state: { userId: userId } });
  };
  const goCommunityPost = () => {
    navigate('/post', { state: { userId: userId } });
  };
  const goContents = () => {
    navigate('/contents', { state: { userId: userId } });
  };
  const goSetting = () => {
    navigate(`/setting/${userId.id}`);
  };
  const Logout = () => {
    navigate('/');
  };
  return (
    <div className="Header">
      <div>
        <div className="logo-icon" onClick={goHome}>
          <img src="/logo_black.svg" className="LogoImg" alt="" />
        </div>
        <div className="mid-icons">
          <div className="mid-icon">
            <IoChatbubbleOutline size={'45%'} />
            <div className="dropdown-content">
              <p onClick={goCommunityMind}>고민</p>
              <p onClick={goCommunityPost}>일반</p>
            </div>
          </div>
          <div className="mid-icon" onClick={goContents}>
            <IoBookOutline size={'45%'} />
          </div>
          <div className="mid-icon" onClick={goSetting}>
            <IoSettingsOutline size={'45%'} />
          </div>
        </div>

        <div className="end-icon" onClick={logout}>
          <IoLogOutOutline size={'45%'} />
        </div>
      </div>
    </div>
  );
}
