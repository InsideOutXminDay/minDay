import { createContext, useState } from "react";


export const emotionList = [
    {
        id: 1,
        name: "행복",
        img: '/emotion1.png',
    },
    {
        id: 2,
        name: "신남",
        img: '/emotion2.png',
    },
    {
        id: 3,
        name: "만족",
        img: '/emotion3.png',
    },
    {
        id: 4,
        name: "감동",
        img: '/emotion4.png',
    },
    {
        id: 5,
        name: "편안",
        img: '/emotion5.png',
    },{
        id: 6,
        name: "뿌듯",
        img: '/emotion6.png',
    },{
        id: 7,
        name: "속시원함",
        img: '/emotion7.png',
    },{
        id: 8,
        name: "그저그럼",
        img: '/emotion8.png',
    },{
        id: 9,
        name: "비참",
        img: '/emotion9.png',
    },{
        id: 10,
        name: "화남",
        img: '/emotion10.png',
    },{
        id: 11,
        name: "지침",
        img: '/emotion11.png',
    },{
        id: 12,
        name: "상처받음",
        img: '/emotion12.png',
    },{
        id: 13,
        name: "멘붕",
        img: '/emotion13.png',
    },{
        id: 14,
        name: "우울",
        img: '/emotion14.png',
    },{
        id: 15,
        name: "불안",
        img: '/emotion15.png',
    },{
        id: 16,
        name: "예민",
        img: '/emotion16.png',
    },
  ];


// diary 데이터
export const diaryDatas = [
    {
      "id_diary": 1,
      "id_emotion": 14,
      "id_user": 1,
      "contents": "그냥 너무 사는게 우울하고 슬프다ㅠㅠ",
      "date": "2024-06-20"
    },
    {
      "id_diary": 2,
      "id_emotion": 1,
      "id_user": 1,
      "contents": "행복해!",
      "date": "2024-07-04"
    }
  ];


export function diaryReducer(state, action) {
switch (action.type) {
    case "CREATE": {
        console.log("create", [action.data, ...state])
        return [action.data, ...state];
        }
    case "UPDATE": {
        console.log("update", action.data)
        return state.map((it) =>
            String(it.id_diary) === String(action.data.id_diary) ? { ...action.data } : it
        );
    }
    case "DELETE": {
        return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    default: {
        return state;
    }
}
}

export const onCreate = (dispatch) => (data) => {
    dispatch({
      type: "CREATE",
      data: {
        id_diary: data.id_diary,
        date: data.date,
        contents:data.contents,
        id_emotion:data.id_emotion,
        id_user:data.id_user
      },
    });
  };

export const onUpdate = (dispatch) => (data) => {
    dispatch({
      type: "UPDATE",
      data: {
        id_diary: data.id_diary,
        date: data.date,
        contents:data.contents,
        id_emotion:data.id_emotion,
        id_user:data.id_user
      },
    });
  };

export const getDiaryData =  () => {
const fetchData = async () => {
    // 로컬스토리지에서 데이터 가져오기
    const diaryString = window.localStorage.getItem('diary');
    const diaryObj = diaryString ? JSON.parse(diaryString) :[];

    const combinedData = [...diaryDatas, ...diaryObj];
    return combinedData;
    };
    const data =  fetchData();
    return data;
}
