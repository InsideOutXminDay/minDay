import { useState } from "react"
import '../../../styles/HomexDiary/CheckList/CheckItem.css'
import axios from "axios";


export default function CheckItem({Askcheck, User}){
    const [is_done, setIsDone] = useState(Askcheck.isdone);
    const onChangeCheckbox = async() => {
        const updatedIsDone = !is_done;
        setIsDone(updatedIsDone)
        try{
            const res = await axios.post('http://localhost:5000/updatechecklist', 
                {   
                    id_askcheck: Askcheck.id_askcheck,
                    id_user: User.id_user,
                    content: Askcheck.content,
                    isdone: updatedIsDone,
                    type: Askcheck.type });
            console.log('res.data : ', res.data)
        }catch(err){
            console.error(err)
        }
    };
        
    
    const sentence=()=>{
        switch(Askcheck.type){
            case "sleep": return `${Askcheck.content}시에 취침`;
            case "wake": return `${Askcheck.content}시에 기상`;
            case "phone": return `${Askcheck.content}시간 이하의 도파민 섭취`;
            case "exercise": return `${Askcheck.content}시간 이상 운동하기`;
            case "satisfaction":
            case "hobby":
            case "meal":
            case "rest": return Askcheck.content;
            default: return '';
        }
    }
    return(
        <div className="CheckItem">
            <div className='checkbox-col'>
                <input onChange={onChangeCheckbox} type='checkbox' checked={is_done}></input>
            </div>
            <div className='content-col'>{sentence()}</div>
        </div>
    )
    
}