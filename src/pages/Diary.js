import { useNavigate, useParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor"
import Header from "../components/Header"
import { useState,useEffect, useContext } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

export default function Diary(){
    const [predata, setPreData] = useState([]);
    const diaryId = useParams();
    const {data} = useContext(DiaryStateContext)
    console.log(data);
    // diary 데이터관련
    const {onUpdate} = useContext(DiaryDispatchContext);
    useEffect(() => {
        const foundData = data.find(value => String(value.id_diary) === String(diaryId.id));
        if (foundData){setPreData(foundData);}
    }, [diaryId]);
   
    const navigate = useNavigate();

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