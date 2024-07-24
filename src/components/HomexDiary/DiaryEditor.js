import moment from "moment";
import { useEffect, useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import '../../styles/HomexDiary/DiaryEditor.css'

export default function DiaryEditor({initDate, initData, onSubmit, userId, emotionData}){
    const navigate = useNavigate();

    //생성 시 기본 값
    const [state, setState] = useState({
        date:  moment(new Date(initDate)).format('YYYY-MM-DD'),
        id_emotion: 3,
        id_user:userId.id,
        content: "",
    });

    useEffect(() => {
        if (initData&&initData.Diary) {
          setState({
            id_diary:initData.Diary.id_diary,
            date: moment(new Date(initData.Diary.date)).format('YYYY-MM-DD'),
            id_emotion: initData.Diary.id_emotion,
            id_user: initData.id_user,
            content:initData.Diary.content
          });
        }
      }, [initData]);

    const handleChangeEmotion = useCallback((id_emotion) => {
        setState((state) => ({
            ...state,
            id_emotion,
        }));
    }, []);
    const handleChangeContent = (e) => {
        setState({
          ...state,
          content: e.target.value,
        });

      };
    const handleSubmit = () => {
        onSubmit(state);
        window.location.href = `/home/${userId.id}`;
    };
    const handleOnGoBack = () => {
        navigate(-1);
      };
    return(
        <div className="DiaryEditor">
            <div className="emotion-selector">
                <h4>{`${state.date}의 감정을 선택하세요.`}</h4>
                <div className="emotions">
                    {emotionData.map((it) => (
                        <EmotionItem
                        key={it.id_emotionlist}
                        {...it}
                        onClick={handleChangeEmotion}
                        isSelected={state.id_emotion === it.id_emotionlist}
                        />
                    ))}
                </div>
            </div>
            <div className="diary-editor">
                <h4>{`${state.date}의 한줄 일기를 적어보세요.`}</h4>
                <div className="input-wrapper">
                    <textarea
                        placeholder="오늘은 어땠나요?"
                        defaultValue={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>
            <div className="bottom-section">
                <button onClick={handleOnGoBack}>취소하기</button>
                <button onClick={handleSubmit}>작성하기</button>
            </div>
            
        </div>
    )
}