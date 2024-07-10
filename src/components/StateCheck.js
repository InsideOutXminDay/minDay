import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

export default function StateCheck({ initData ,user_id,onUpdate}) {
    const { onListUpdate } = useContext(DiaryDispatchContext)

    //기본값(생성)
    const [sleep, setSleep] = useState({id_ask:parseInt(String(user_id)+"1"),id_user:user_id, content:"22:00", isdone:0}); 
    const [wake, setWake] = useState({id_ask:parseInt(String(user_id)+"2"),id_user:user_id, content:"06:00", isdone:0}); 
    const [phone, setPhone] = useState({id_ask:parseInt(String(user_id)+"3"),id_user:user_id, content:3, isdone:0}); 
    const [satisfaction, setSatisfaction] = useState({id_ask:parseInt(String(user_id)+"4"),id_user:user_id, content:"맛있는거 먹기", isdone:0});
    const [hobby, setHobby] = useState({id_ask:parseInt(String(user_id)+"5"),id_user:user_id, content:"달리기", isdone:0});
    const [exercise, setExercise] = useState({id_ask:parseInt(String(user_id)+"6"),id_user:user_id, content:3, isdone:0});
    const meal = {id_ask:parseInt(String(user_id)+"7"),id_user:user_id, content:"식사 챙겨 먹기", isdone:0}
    const rest = {id_ask:parseInt(String(user_id)+"8"),id_user:user_id, content:"충분한 휴식 취하기", isdone:0}

    const getContentByAskId=(id)=>{
        return initData.find(value=>value.id_ask == id)
    }

    useEffect(() => {
        if (initData.length) {
            setSleep(getContentByAskId(String(user_id)+"1"));
            setWake(getContentByAskId(String(user_id)+"2"));
            setPhone(getContentByAskId(String(user_id)+"3"));
            setSatisfaction(getContentByAskId(String(user_id)+"4"));
            setHobby(getContentByAskId(String(user_id)+"5"));
            setExercise(getContentByAskId(String(user_id)+"6"));
        }
    }, [initData]); // Adding initData as a dependency


    const onSubmit = () => {
        onUpdate(sleep.id_ask, sleep.id_user, sleep.content, sleep.isdone);
        onUpdate(wake.id_ask, wake.id_user, wake.content, wake.isdone);
        onUpdate(phone.id_ask, phone.id_user, phone.content, phone.isdone);
        onUpdate(satisfaction.id_ask, satisfaction.id_user, satisfaction.content,satisfaction.isdone);
        onUpdate(hobby.id_ask, hobby.id_user, hobby.content, hobby.isdone);
        onUpdate(exercise.id_ask, exercise.id_user, exercise.content, exercise.isdone);
        onUpdate(meal.id_ask, meal.id_user, meal.content, meal.isdone);
        onUpdate(rest.id_ask, rest.id_user, rest.content, rest.isdone);
        navigate("/home")

    }
    const navigate = useNavigate();

    const handleSleepChange = (event) => {
        setSleep(data=>({...data, content:event.target.value}));
    };
    const handleWakeChange = (event) => {
        setWake(data=>({...data, content:event.target.value}));
    };
    const handlePhoneChange = (event) => {
        setPhone(data=>({...data, content:event.target.value}));
    };
    const handleSafisfactionChange = (event) => {
        setSatisfaction(data=>({...data, content:event.target.value}));
    };
    const handleHobbyChange = (event) => {
        setHobby(data=>({...data, content:event.target.value}));
    };
    const handleExerciseChange = (event) => {
        setExercise(data=>({...data, content:event.target.value}));
    };


    return (
        <div>
            <div className="Question">
            <div className="q">
                <p>취침시간을 언제로 정하고싶나요 ?</p>
                <input type="time" value={sleep.content} onChange={handleSleepChange}/>
            </div>
            <div className="q">
                <p>기상시간을 언제로 정하고싶나요 ?</p>
                <input type="time" value={wake.content} onChange={handleWakeChange}/>
            </div>
            <div className="q">
                <p>최대 디지털기기 사용시간을 얼마로 정하고싶나요 ?</p>
                <input type="number" placeholder={phone.content} onChange={handlePhoneChange}/>
            </div>
            <div className="q">
                <p>매일의 나에게 선물해주고싶은 일은 무엇인가요 ?</p>
                <textarea type="text" placeholder={satisfaction.content} onChange={handleSafisfactionChange}/>
                
            </div>
            <div className="q">
                <p>취미가 무엇인가요 ?</p>
                <textarea type="text" placeholder={hobby.content} onChange={handleHobbyChange}/>
                
            </div>
            <div className="q">
                <p>하루 운동량은 얼마인가요 ?</p>
                <textarea type="text" placeholder={exercise.content} onChange={handleExerciseChange}/>
                
            </div>
            <button onClick={onSubmit}>dd</button>
            </div>
        </div>
    );
}