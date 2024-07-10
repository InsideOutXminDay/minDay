import { useContext } from "react"
import { DiaryDispatchContext } from "../App";
import '../styles/CheckItem.css'


export default function CheckItem({id_ask, id_user,content, isdone}){
    const {onListUpdate} = useContext(DiaryDispatchContext);
    // console.log(id_ask, id_user,content, isdone)
    const onChangeCheckbox = () => {
        onListUpdate(id_ask, id_user, content, !isdone);
    };
    const sentence=()=>{
        switch(id_ask){
            case parseInt(`${id_user}1`): return `${content}시에 취침`;
            case parseInt(`${id_user}2`): return `${content}시에 기상`;
            case parseInt(`${id_user}3`): return `${content}시간 이하의 도파민 섭취`;
            case parseInt(`${id_user}6`): return `${content}시간 이상 운동하기`;
            case parseInt(`${id_user}4`):
            case parseInt(`${id_user}5`):
            case parseInt(`${id_user}7`):
            case parseInt(`${id_user}8`): return content;
            default: return '';
        }
    }
    return(
        <div className="CheckItem">
            <div className='checkbox-col'>
                <input onChange={onChangeCheckbox} type='checkbox' checked={isdone}></input>
            </div>
            <div className='content-col'>{sentence()}</div>
            {/* <button onClick={onClickDelete}>delete</button> */}
        </div>
    )
    
}