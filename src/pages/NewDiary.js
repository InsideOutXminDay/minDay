import { useLocation, useNavigate } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor"
import Header from "../components/Header"
import { useContext } from "react";
// 다이어리 데이터
import { DiaryDispatchContext } from "../App";

export default function NewDiary(){
    const location = useLocation();
    const { date } = location.state || {}; 
    const {onCreate} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        onCreate(data);
        navigate('/home',{replace:true});
    }
    return (
        <div style={{display:"flex"}}>
            <Header/>
            <DiaryEditor initDate={date} onSubmit={onSubmit}/>
        </div>
    )
}