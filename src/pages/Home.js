import { useContext, useEffect, useState } from "react";
import CalendarComponent from "../components/HomexDiary/Calendar";
import CheckList from "../components/HomexDiary/CheckList/CheckList";
import Header from "../components/Header";
import { DiaryStateContext } from "../App";
import axios from "axios";
import { FindData } from "../util";
import Paragraph from "../components/HomexDiary/Paragraph";

export default function Home(){
    const [initData, setInitData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/askchecks')
            .then((res) => {
                const foundData = FindData(res.data)
                setInitData(foundData)
            }
            ).catch(error => console.error('Error:', error));
    }, []);

    return(
        <div style={{display:"flex"}}>
            <Header/>
            <CalendarComponent/>
            <div style={{width:"70%", height:"100vh"}}>
                <Paragraph />
                <CheckList initData={initData}/>
            </div>
            
        </div>
    )
}