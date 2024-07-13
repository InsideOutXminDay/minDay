import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function StateCheck({ initData ,user_id,onUpdate}) {
    const navigate = useNavigate();

    //기본값(생성)
    const [sleep, setSleep] = useState({id_ask:parseInt(`${user_id}1`),id_user:user_id, content:"22:00", isdone:0}); 
    const [wake, setWake] = useState({id_ask:parseInt(`${user_id}2`),id_user:user_id, content:"06:00", isdone:0}); 
    const [phone, setPhone] = useState({id_ask:parseInt(`${user_id}3`),id_user:user_id, content:3, isdone:0}); 
    const [satisfaction, setSatisfaction] = useState({id_ask:parseInt(`${user_id}4`),id_user:user_id, content:"맛있는거 먹기", isdone:0});
    const [hobby, setHobby] = useState({id_ask:parseInt(`${user_id}5`),id_user:user_id, content:"달리기", isdone:0});
    const [exercise, setExercise] = useState({id_ask:parseInt(`${user_id}6`),id_user:user_id, content:3, isdone:0});
    const meal = {id_ask:parseInt(`${user_id}7`),id_user:user_id, content:"식사 챙겨 먹기", isdone:0}
    const rest = {id_ask:parseInt(`${user_id}8`),id_user:user_id, content:"충분한 휴식 취하기", isdone:0}

    const getContentByAskId=(id)=>{
        return initData.find(value=>value.id_ask == id)
    }

    useEffect(() => {
        if (initData.length) {
            setSleep(getContentByAskId(`${user_id}1`));
            setWake(getContentByAskId(`${user_id}2`));
            setPhone(getContentByAskId(`${user_id}3`));
            setSatisfaction(getContentByAskId(`${user_id}4`));
            setHobby(getContentByAskId(`${user_id}5`));
            setExercise(getContentByAskId(`${user_id}6`));
        }
    }, [initData]); // Adding initData as a dependency


    const onSubmit = () => {
        const tasks = [sleep, wake, phone, satisfaction, hobby, exercise, meal, rest];
    
        tasks.forEach(task => {
            onUpdate(task.id_ask, task.id_user, task.content, task.isdone);
        });
    
        navigate("/home");
    };


    return (
        <div>
            <div className="Question">
            <div className="q">
                <p>취침시간을 언제로 정하고싶나요 ?</p>
                <input type="time" value={sleep.content} 
                        onChange={(e)=>setSleep(data=>({...data, content:event.target.value}))}/>
            </div>
            <div className="q">
                <p>기상시간을 언제로 정하고싶나요 ?</p>
                <input type="time" value={wake.content} 
                        onChange={(e)=>setWake(data=>({...data, content:event.target.value}))}/>
            </div>
            <div className="q">
                <p>최대 디지털기기 사용시간을 얼마로 정하고싶나요 ?</p>
                <input type="number" placeholder={phone.content} 
                    onChange={(e)=>setPhone(data=>({...data, content:event.target.value}))}/>
            </div>
            <div className="q">
                <p>매일의 나에게 선물해주고싶은 일은 무엇인가요 ?</p>
                <textarea type="text" placeholder={satisfaction.content} 
                    onChange={(e)=>setSatisfaction(data=>({...data, content:event.target.value}))}/>
                
            </div>
            <div className="q">
                <p>취미가 무엇인가요 ?</p>
                <textarea type="text" placeholder={hobby.content} 
                    onChange={(e)=>setHobby(data=>({...data, content:event.target.value}))}/>
                
            </div>
            <div className="q">
                <p>하루 운동량은 얼마인가요 ?</p>
                <textarea type="number" placeholder={exercise.content} onChange={(e)=>setExercise(data=>({...data, content:event.target.value}))}/>
                
            </div>
            <button onClick={onSubmit}>dd</button>
            </div>
        </div>
    );
}