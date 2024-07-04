import '../styles/Calendar.css'
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { IoPencilOutline } from "react-icons/io5";



export default function CalendarComponent(){
  const [date, setDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]);
  const [nowDiary, setNowDiary] = useState(null);
  const [Isview, setView] = useState(true);


  useEffect(() => {
    // Fetch the diary data from the public folder
    fetch('/datas/diary.json')
      .then((response) => response.json())
      .then((data) => setDiaryData(data))
  }, []);

  const onChange = (day) =>{
    setView(true)
    setDate(day)
    const dateStr = moment(day).format('YYYY-MM-DD');
    const matching = diaryData.find((value)=>value.date === dateStr)
    if(matching){
      setNowDiary(matching)
    }else{setNowDiary(null)}
    
  }


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
          <div className='emotion-section'>
            {
              !Isview?<p></p>:(
                nowDiary?
              <img style={{width:"60px"}} src={`/emotion${nowDiary.id_emotion}.png`} />
              :<button><IoPencilOutline size={40} color='#fffafd'/></button>
            )
              
            }
          </div>
          <div className='diary-section'>
            {
              !Isview?<p></p>:(
                nowDiary?
                <p>{nowDiary.contents}</p>
                :<p>다이어리를 입력하세요.</p>
            )
            }
          </div>


      </div>
  )
}