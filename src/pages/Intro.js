//components
import IntroCheckList from '../components/IntroCheckList';
import IntroCommunity from '../components/IntroCommunity';
import IntroContents from '../components/IntroContents';
import IntroDiary from '../components/IntroDiary';
import IntroFooter from '../components/IntroFooter';
import IntroHeader from '../components/IntroHeader';
import IntroMain from '../components/IntroMain';
import IntroServices from '../components/IntroServices';
import { FaArrowUp } from 'react-icons/fa';
//css
import '../styles/Intro.css';

export default function Intro() {
  return (
    <div id="intro" className="intro">
      <IntroHeader />
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
