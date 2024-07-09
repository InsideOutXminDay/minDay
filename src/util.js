import { createContext, useState } from "react";


export const emotionList = [
    {
        id: 1,
        name: "행복",
        img: '/emotion1.png',
    },{
        id: 2,
        name: "신남",
        img: '/emotion2.png',
    },{
        id: 3,
        name: "만족",
        img: '/emotion3.png',
    },{
        id: 4,
        name: "감동",
        img: '/emotion4.png',
    },{
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

export const onDiaryCreate = (dispatch) => (data) => {
    dispatch({
      type: "CREATEDiary",
      data: {
        id_diary: data.id_diary,
        date: data.date,
        contents:data.contents,
        id_emotion:data.id_emotion,
        id_user:data.id_user
      },
    });
  };

export const onDiaryUpdate = (dispatch) => (data) => {
    dispatch({
      type: "UPDATEDiary",
      data: {
        id_diary: data.id_diary,
        date: data.date,
        contents:data.contents,
        id_emotion:data.id_emotion,
        id_user:data.id_user
      },
    });
  };


// ask/checklist 데이터
export const ListData = [
    {
        id_ask:1,
        id_user:1,
        content:"22:00",
        isdone:0
    },{
        id_ask:2,
        id_user:1,
        content:"06:00",
        isdone:0
    },{
        id_ask:3,
        id_user:1,
        content:3,
        isdone:0
    },{
        id_ask:4,
        id_user:1,
        content:"맛있는거 먹기",
        isdone:0
    },{
        id_ask:5,
        id_user:1,
        content: "달리기",
        isdone:0
    },{
        id_ask:6,
        id_user:1,
        content:3,
        isdone:0
    },{
        id_ask:7,
        id_user:1,
        content:"식사 챙겨 먹기",
        isdone:0
    },{
        id_ask:8,
        id_user:1,
        content:"충분한 휴식 취하기",
        isdone:0        
    }
];


export const onListUpdate = (dispatch) => (id_ask, id_user, content, isdone) => {
    // console.log("data",id_ask, id_user, content, isdone)
    dispatch({
      type: "UPDATEList",
      data: {
        id_ask,
        id_user,
        content,
        isdone
      },
    });
  };

  export function Reducer(state, action) {
switch (action.type) {
    case "CREATEDiary": {
        console.log("create", [action.data, ...state])
        return [action.data, ...state];
        }
    case "UPDATEDiary": {
        console.log("update", action.data)
        return state.map((it) =>
            String(it.id_diary) === String(action.data.id_diary) ? { ...action.data } : it
        );
    }
    case "UPDATEList": {
        console.log("list update", action.data)
        return state.map((it) =>
            String(it.id_ask) === String(action.data.id_ask) ? { ...action.data } : it
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