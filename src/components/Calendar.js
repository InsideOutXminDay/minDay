import '../styles/Calendar.css'
import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

export default function CalendarComponent(){
  const [date, setDate] = useState(new Date());
  const onChange = (day) =>{
    setDate(day)
  }
    return(
        <div className="container">
            <div className="Calendar">
            <Calendar
                locale="en"
                onChange={onChange}
                value={date}
                prevLabel={null}
                nextLabel={null}
                next2Label={null}
                prev2Label={null}
                formatDay={(locale, date) => moment(date).format('D')}
                // tileContent={tileContent}
                showNeighboringMonth={false}
            />
            </div>
            <p>{moment(date).format("YYYY년 MM월 DD일")}</p>


        </div>
    )
}