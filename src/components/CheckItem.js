import { useContext } from "react"
import { DiaryDispatchContext } from "../App";
import '../styles/CheckItem.css'


export default function CheckItem({id_ask, id_user,content, isdone}){
    const {onListUpdate} = useContext(DiaryDispatchContext);
    // console.log(id_ask, id_user,content, isdone)
    const onChangeCheckbox = () => {
        onListUpdate(id_ask, id_user, content, !isdone);
    };
    const onClickDelete = () => {
        onDelete(id);
    };
    return(
        <div className="CheckItem">
            <div className='checkbox-col'>
                <input onChange={onChangeCheckbox} type='checkbox' checked={isdone}></input>
            </div>
            <div className='content-col'>{content}</div>
            <button onClick={onClickDelete}>delete</button>
        </div>
    )
    
}