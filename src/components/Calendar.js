import '../styles/Calendar.css'
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { IoPencilOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getDiaryData } from '../util';

export default function CalendarComponent(){
  const [date, setDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]);
  const [nowDiary, setNowDiary] = useState(null);
  const [Isview, setView] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    getDiaryData().then(diaryData=>{setDiaryData(diaryData)})
  }, []);

  //달력 날짜 타일 누르면 변화 일어나는 함수
  const onChange = (day) =>{
    setView(true)
    setDate(day)
    const dateStr = moment(day).format('YYYY-MM-DD');
    const matching = diaryData.find((value)=>value.date === dateStr)
    if(matching){
      setNowDiary(matching)
    }else{setNowDiary(null)}
  }


  // 타일에 나타낼 요소 정하는 함수
  const tileContent = ({ date, view }) => {
    if (view==='month' ){
    const dateStr = moment(date).format('YYYY-MM-DD');
    const matching = diaryData.find((value)=>value.date === dateStr);
     if (matching) { 
      return (
        <div>
          <img style={{width:"30px"}} src={`/emotion${matching.id_emotion}.png`} />
        </div>
        
      );
    }
  }
    return null;
  };

  // 수정 버튼 클릭으로 일기 수정 
  const onClickUpdate = () => {
    const moveTo = nowDiary?`/diary/${nowDiary.id_diary}`:'/newdiary'
    navigate(moveTo, { state: { date: date } })
  }
  return(
      <div className="container">
          <div className="Calendar">
            <Calendar
                locale="en"
                onChange={onChange}
                value={date}
                next2Label={null}
                prev2Label={null}
                formatDay={(locale, date) => moment(date).format('D')}
                tileContent={tileContent}
                showNeighboringMonth={false}
                onViewChange={()=>setView(false)}
            />
          </div>
          
          {
            !Isview?null
            :(nowDiary?
              <>
                <div className='emotion-section'>
                  <img style={{width:"60px"}} src={`/emotion${nowDiary.id_emotion}.png`} />
                </div>
                <div className='diary-section'>
                  <p>{nowDiary.contents}</p>
                </div>
              </>:null)
          }
          <div className='edit-section'>
            <button onClick={onClickUpdate}><IoPencilOutline size={35} color='#fffafd'/></button>
          </div>
            
      </div>
  )
}