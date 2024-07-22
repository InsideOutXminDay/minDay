import { useLocation, useNavigate } from "react-router-dom";
import DiaryEditor from "../components/HomexDiary/DiaryEditor"
import Header from "../components/Header"
import axios from "axios";
// 다이어리 데이터

export default function NewDiary(){
    const location = useLocation();
    const { date } = location.state || {}; 
    
    const onSubmit = async(data) => {
        // onCreate(data);
        try{
            const res = await axios.post(`http://localhost:5000/creatediary`, {data});
        }catch(err){
            console.error(err)
        }
    }
    return (
        <div style={{display:"flex"}}>
            <Header/>
            <DiaryEditor initDate={date} onSubmit={onSubmit}/>
        </div>
    )
}