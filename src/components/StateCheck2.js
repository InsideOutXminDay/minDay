import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

export default function StateCheck2({ initData ,user_id}) {
    const { onListUpdate } = useContext(DiaryDispatchContext)

    const initialState = [
        {id_ask:parseInt(String(user_id)+"1"),id_user:user_id, content:"22:00", isdone:0},
        {id_ask:parseInt(String(user_id)+"2"),id_user:user_id, content:"06:00", isdone:0},
        {id_ask:parseInt(String(user_id)+"3"),id_user:user_id, content:3, isdone:0},
        {id_ask:parseInt(String(user_id)+"4"),id_user:user_id, content:"맛있는거 먹기", isdone:0},
        {id_ask:parseInt(String(user_id)+"5"),id_user:user_id, content:"달리기", isdone:0},
        {id_ask:parseInt(String(user_id)+"6"),id_user:user_id, content:3, isdone:0},
        {id_ask:parseInt(String(user_id)+"7"),id_user:user_id, content:"식사 챙겨 먹기", isdone:0},
        {id_ask:parseInt(String(user_id)+"8"),id_user:user_id, content:"충분한 휴식 취하기", isdone:0}
    ]

    const getContentByAskId=(id)=>{
        return initData.find(value=>value.id_ask == id)
    }

    const [state, setState] = useState(initialState)
    useEffect(() => {
        if(initData.length){
            setState(initData)
        }
    }, [initData]); 
    console.log(state)

    return (
        <div>
            <div className="Question">
            <div className="q">
                <p>취침시간을 언제로 정하고싶나요 ?</p>
                <input type="time" value={getContentByAskId(String(user_id)+"1").content} onChange={(e)=>console.log(e.target.value)}/>
            </div>
            <div className="q">
                <p>기상시간을 언제로 정하고싶나요 ?</p>
                <input type="time" value={getContentByAskId(String(user_id)+"2").content} onChange={(e)=>console.log(e.target.value)}/>
            </div>
            <div className="q">
                <p>최대 디지털기기 사용시간을 얼마로 정하고싶나요 ?</p>
                <input type="number" placeholder={getContentByAskId(String(user_id)+"3").content} onChange={(e)=>console.log(e.target.value)}/>
            </div>
            <div className="q">
                <p>매일의 나에게 선물해주고싶은 일은 무엇인가요 ?</p>
                <textarea type="text" placeholder={getContentByAskId(String(user_id)+"4").content} onChange={(e)=>console.log(e.target.value)}/>
                
            </div>
            <button onClick={onSubmit}>dd</button>
            </div>
        </div>
    );
}