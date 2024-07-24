//components
import IntroCheckList from '../components/Intros/IntroCheckList';
import IntroCommunity from '../components/Intros/IntroCommunity';
import IntroContents from '../components/Intros/IntroContents';
import IntroDiary from '../components/Intros/IntroDiary';
import IntroFooter from '../components/Intros/IntroFooter';
import IntroHeader from '../components/Intros/IntroHeader';
import IntroMain from '../components/Intros/IntroMain';
import IntroServices from '../components/Intros/IntroServices';
import { FaArrowUp } from 'react-icons/fa';
//css
import '../styles/Intros/Intro.css';

export default function Intro({ token, logout, authUser }) {
  return (
    <div id="intro" className="intro">
      <IntroHeader token={token} logout={logout} authUser={authUser} />
      <main>
        <a href="#intro" class="top-btn">
          <span>위로</span>
          <FaArrowUp />
        </a>
        <IntroMain />
        <IntroServices />
        <IntroDiary />
        <IntroCheckList />
        <IntroCommunity />
        <IntroContents />
      </main>
      <IntroFooter />
    </div>
  );
}
