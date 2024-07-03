import '../styles/Header.css'
import { IoChatbubbleOutline, IoBookOutline, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
export default function Header(){
    const navigate = useNavigate();

    const goHome=()=>{
        // user테이블 연결 후 /home/:userid 로 변경
        navigate('/home'); 
    }
    const goCommunityMind=()=>{
        // user테이블 연결 후 /home/:userid 로 변경
        alert('/mind'); 
    }
    const goCommunityPost=()=>{
        // user테이블 연결 후 /home/:userid 로 변경
        alert('/post'); 
    }
    const goRecommend=()=>{
        // 추천컨텐츠 어떻게할지 고민(임시 작성)
        // navigate('/recommend'); 
        alert("/recommend");
    }
    const goContents=()=>{
        // navigate('/category'); // 페이지 작성 후 연결
        alert("/category");
    }
    const goSetting=()=>{
        // navigate('/setting'); // 페이지 작성 후 연결
        alert("/setting");
    }
    const Logout=()=>{
        // navigate('/'); // 페이지 작성 후 연결
        alert("/");

    }
    return(
        <div className="Header">
            <div>
                <div className='logo-icon' onClick={goHome}><img src="/logo_black.svg" className='LogoImg'/></div>
                <div className='mid-icon' >
                    <IoChatbubbleOutline size={"35"}/>
                    <div className='dropdown-content'>
                        <p onClick={goCommunityMind}>고민</p>
                        <p onClick={goCommunityPost}>일반</p>
                    </div>
                </div>
                <div className='mid-icon' onClick={goRecommend}><BiLike size={"35"}/></div>
                <div className='mid-icon' onClick={goContents}><IoBookOutline size={"35"}/></div>
                <div className='mid-icon' onClick={goSetting}><IoSettingsOutline size={"35"}/></div>
                <div className='end-icon' onClick={Logout}><IoLogOutOutline size={"35"}/></div>

            </div>
        </div>
    )
}