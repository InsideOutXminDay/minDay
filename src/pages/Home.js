import { useContext, useEffect, useState } from "react";
import CalendarComponent from "../components/Calendar";
import CheckList from "../components/CheckList";
import Header from "../components/Header";
import { DiaryStateContext } from "../App";

import { FindData } from "../util";

export default function Home(){
    const {data_l} = useContext(DiaryStateContext);
    const [initData, setInitData] = useState([])

    // db연결 시 테이블에서 정제된 데이터 가져오기 (차후 id_user에 따라서-useParams 이용?)
    useEffect(() => {
        const foundData = FindData(data_l)
        if (foundData){setInitData(foundData);}
    }, [data_l]);  

    return(
        <div style={{display:"flex"}}>
            <Header/>
            <CalendarComponent/>
            <CheckList initData={initData}/>
        </div>
    )
}