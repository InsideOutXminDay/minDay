import { useLocation, useNavigate } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor"
import Header from "../components/Header"
import { useState,useEffect } from "react";

export default function NewDiary(){
    const location = useLocation();
    const { date } = location.state || {}; 
    const navigate = useNavigate();
    //localStorage
    const diaryData = JSON.parse(window.localStorage.getItem('diary'))||[];
    //localStorage
    const onCreate = (data) => {
        const updatedDiaryData = [data, ...diaryData];
        console.log("JSON.stringify(diaryData)", updatedDiaryData);
        window.localStorage.setItem('diary', JSON.stringify(updatedDiaryData))
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