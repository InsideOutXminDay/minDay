import moment from "moment";
import { useEffect, useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util";
import EmotionItem from "./EmotionItem";
import '../styles/DiaryEditor.css'

export default function DiaryEditor({initDate, initData, onSubmit}){
    const navigate = useNavigate();
    
    //생성 시 기본 값
    const [state, setState] = useState({
        id_diary:0,
        date:  moment(new Date(initDate)).format('YYYY-MM-DD'),
        id_emotion: 3,
        id_user:1,
        contents: "",
    });

    useEffect(() => {
        if (initData) {
          setState({
            ...initData,
            date: moment(new Date(initData.date)).format('YYYY-MM-DD'),
          });
        }
      }, [initData]);

    const handleChangeEmotion = useCallback((id_emotion) => {
        setState((state) => ({
            ...state,
            id_emotion,
        }));
        console.log(state)
    }, []);
    const handleChangeContent = (e) => {
        setState({
          ...state,
          contents: e.target.value,
        });
        console.log(state)

      };
    const handleSubmit = () => {
        onSubmit(state);
        console.log(state)

    };
    const handleOnGoBack = () => {
        navigate(-1);
      };
    return(
        <div className="DiaryEditor">
            <div className="emotion-selector">
                <h4>{`${state.date}의 감정을 선택하세요.`}</h4>
                <div className="emotions">
                    {emotionList.map((it) => (
                        <EmotionItem
                        key={it.id}
                        {...it}
                        onClick={handleChangeEmotion}
                        isSelected={state.id_emotion === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="diary-editor">
                <h4>{`${state.date}의 한줄 일기를 적어보세요.`}</h4>
                <div className="input-wrapper">
                    <textarea
                        placeholder="오늘은 어땠나요?"
                        defaultValue={state.contents}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>
            <div className="editor-section bottom-section">
                <button onClick={handleOnGoBack}>취소하기</button>
                <button onClick={handleSubmit}>작성하기</button>
            </div>
            
        </div>
    )
}