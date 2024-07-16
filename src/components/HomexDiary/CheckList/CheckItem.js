import { useContext } from "react"
import { DiaryDispatchContext } from "../../../App";
import '../../../styles/HomexDiary/CheckList/CheckItem.css'


export default function CheckItem({id_ask, id_user,content, isdone, type}){
    const {onListUpdate} = useContext(DiaryDispatchContext);
    const onChangeCheckbox = () => {
        onListUpdate(id_ask, id_user, content, !isdone, type);
    };
    const sentence=()=>{
        switch(type){
            case "sleep": return `${content}시에 취침`;
            case "wake": return `${content}시에 기상`;
            case "phone": return `${content}시간 이하의 도파민 섭취`;
            case "exercise": return `${content}시간 이상 운동하기`;
            case "satisfaction":
            case "hobby":
            case "meal":
            case "rest": return content;
            default: return '';
        }
    }
    return(
        <div className="CheckItem">
            <div className='checkbox-col'>
                <input onChange={onChangeCheckbox} type='checkbox' checked={isdone}></input>
            </div>
            <div className='content-col'>{sentence()}</div>
        </div>
    )
    
}