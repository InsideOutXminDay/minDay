import IntroFooter from '../components/IntroFooter';
import IntroHeader from '../components/IntroHeader';
import IntroMain from '../components/IntroMain';
import IntroServices from '../components/IntroServices';

export default function Intro() {
  return (
    <div className="into">
      <IntroHeader />
      <main>
        <IntroMain />
        <IntroServices />
      </main>
      <IntroFooter />
    </div>
  );
}
