import { useContext } from "react";
import CalendarComponent from "../components/Calendar";
import CheckList from "../components/CheckList";
import Header from "../components/Header";
import { DiaryStateContext } from "../App";

export default function Home(){
    // db연결 시 테이블에서 정제된 데이터 가져오기 (id_user에 따라서)
    const {data_l} = useContext(DiaryStateContext);

    return(
        <div style={{display:"flex"}}>
            <Header/>
            <CalendarComponent/>
            <CheckList initData={data_l}/>
        </div>
    )
}