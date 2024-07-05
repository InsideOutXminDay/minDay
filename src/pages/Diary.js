import { useNavigate, useParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor"
import Header from "../components/Header"
import { getDiaryData } from "../util";
import { useState,useEffect } from "react";

export default function Diary(){
    const [predata, setPreData] = useState([]);
    const diaryId = useParams();

    useEffect(() => {
        getDiaryData().then(diaryData => {
            const foundData = diaryData.find(value => 
                String(value.id_diary) === String(diaryId.id));
            if (foundData) {
                setPreData(foundData);
            }
        });
    }, [diaryId]);
   
    const navigate = useNavigate();
    const onUpdate = (data) => {
        const dataString = JSON.stringify(data);
        window.localStorage.setItem('diary',dataString)
    }
    const onSubmit = (data) => {
        onUpdate(data);
        navigate('/home',{replace:true});
    }
    return (
        <div style={{display:"flex"}}>
            <Header/>
            <DiaryEditor initData={predata} onSubmit={onSubmit}/>
        </div>
    )
}