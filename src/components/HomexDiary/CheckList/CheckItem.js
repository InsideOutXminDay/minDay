import { useState } from "react"
import '../../../styles/HomexDiary/CheckList/CheckItem.css'


export default function CheckItem({id_askcheck, id_user,content, isdone, type}){
    const [is_done, setIsDone] = useState(isdone);
    const onChangeCheckbox = async() => {
        const updatedIsDone = !is_done;
        await fetch('http://localhost:4000/api/updatechecklist', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_askcheck: id_askcheck,
                id_user: id_user,
                content: content,
                isdone: updatedIsDone,
                type: type
            })
        }).then(async(res)=>{
            setIsDone(updatedIsDone)
            // navigate('/home')
            if(!res.ok){
                throw new Error(`error! status: ${res.status}`)
            }}).catch(error=>console.log('Error:', error.meesage))
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
                <input onChange={onChangeCheckbox} type='checkbox' checked={is_done}></input>
            </div>
            <div className='content-col'>{sentence()}</div>
        </div>
    )
    
}