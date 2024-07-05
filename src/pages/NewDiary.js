import { useLocation, useNavigate } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor"
import Header from "../components/Header"
export default function NewDiary(){
    const location = useLocation();
    const { date } = location.state || {}; 
    const navigate = useNavigate();
    const onCreate = (data) => {
        const dataString = JSON.stringify(data);
        window.localStorage.setItem('diary',dataString)
    }
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