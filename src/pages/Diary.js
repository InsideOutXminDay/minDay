import { useNavigate, useParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor"
import Header from "../components/Header"
import { getDiaryData } from "../util";
import { useState,useEffect } from "react";

export default function Diary(){
    const [predata, setPreData] = useState([]);
    const diaryId = useParams();
    // localStorage
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
    // localStorage
    const onUpdate = (data) => {
        const updatedDiaryData = [data, ...JSON.parse(window.localStorage.getItem('diary'))||[]];
        console.log("JSON.stringify(diaryData)", updatedDiaryData);
        window.localStorage.setItem('diary', JSON.stringify(updatedDiaryData))
    }
    const onSubmit = (data) => {
        // localStorage
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