import { useState, useEffect } from "react";
import '../../styles/Ask/StateCheck.css'


export default function StateCheck({ initData, onUpdate, userId}) {

    const [state, setState] = useState({
        sleep:{content:"22:00"},
        wake: {content:"06:00"},
        phone: {content:3},
        satisfaction: {content:"맛있는거 먹기"},
        hobby: {content:"달리기"},
        exercise: {content:3},
        meal:{content:"식사 잘 챙겨먹기"},
        rest: {content:"충분한 휴식 취하기"}})

    useEffect(() => {
        if (initData.sleep) {
            setState(initData)   
        }
    }, [initData]); // Adding initData as a dependency    



    const onSubmit = () => {
        onUpdate(state);
        window.location.href = `/home/${userId.id}`;
    };


    return (
        <div className="StateCheck">
            <div className="Question">
            <div className="q">
                <p>취침시간을 언제로 정하고싶나요 ?</p>
                <input type="time" value={state.sleep.content}
                        onChange={(e)=>setState(data=>({...data, sleep:{...data.sleep, content:e.target.value}}))}/>
            </div>
            <div className="q">
                <p>기상시간을 언제로 정하고싶나요 ?</p>
                <input type="time" value={state.wake.content}
                        onChange={(e)=>setState(data=>({...data, wake:{...data.wake, content:e.target.value}}))}/>
            </div>
            <div className="q">
                <p>최대 디지털기기 사용시간을 얼마로 정하고싶나요 ?</p>
                <input type="number" placeholder={state.phone.content}
                    min={1}
                    max={6}
                    onChange={(e)=>setState(data=>({...data, phone:{...data.phone, content:String(e.target.value<1?1:e.target.value)}}))}/>
            </div>
            <div className="q">
                <p>매일의 나에게 선물해주고싶은 일은 무엇인가요 ?</p>
                <textarea type="text" placeholder={state.satisfaction.content}
                    onChange={(e)=>setState(data=>({...data, satisfaction:{...data.satisfaction, content:e.target.value}}))}/>
                
            </div>
            <div className="q">
                <p>취미가 무엇인가요 ?</p>
                <textarea type="text" placeholder={state.hobby.content}
                    onChange={(e)=>setState(data=>({...data, hobby:{...data.hobby, content:e.target.value}}))}/>
                
            </div>
            <div className="q">
                <p>하루 운동량은 얼마인가요 ?</p>
                <input type="number"placeholder={state.exercise.content} 
                    min={1}
                    max={17}
                    onChange={(e)=>setState(data=>({...data, exercise:{...data.exercise, content:String(e.target.value<1?1:e.target.value)}}))}/>
                
            </div>
            <button onClick={onSubmit}>완료</button>
            </div>
        </div>
    );
}