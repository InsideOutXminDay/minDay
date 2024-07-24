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
    // user테이블 연결 후 /home/:userid 로 변경
    navigate(`/home/${userId.id}`);
  };
  const goCommunityMind = () => {
    navigate('/mind');
  };
  const goCommunityPost = () => {
    navigate('/post');
  };
  const goRecommend = () => {
    // 추천컨텐츠 어떻게할지 고민(임시 작성)
    // navigate('/recommend');
    alert('/recommend');
  };
  const goContents = () => {
    navigate('/contents', { state: { userId: userId } });
  };
  const goSetting = () => {
    navigate('/setting/${userId.id}');
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
          <div className="mid-icon" onClick={goRecommend}>
            <BiLike size={'45%'} />
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
