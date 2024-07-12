// 임시 사용자 id
export const user_id = 1;

// 감정 데이터
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

//글귀 데이터
export const ParagraphDatas = [
    {
        id_paragraph:1,
        article:"Success is not final, failure is not fatal: It is the courage to continue that counts.",
        ver_ko: "성공은 최종적이지 않고, 실패는 치명적이지 않습니다: 계속하는 용기가 중요합니다.",
        writer:"Winston Churchill"
    },{
        id_paragraph:2,
        article:"The only true wisdom is in knowing you know nothing.",
        ver_ko: "진정한 지혜는 네가 아무 것도 모른다는 것을 알 때 나타납니다.",
        writer:"Socrates"
    },{
        id_paragraph:3,
        article:"Be yourself; everyone else is already taken.",
        ver_ko: "네 자신이 되어라; 다른 사람들은 이미 누군가입니다.",
        writer:"Oscar Wilde"
    },{
        id_paragraph:4,
        article:"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        ver_ko: "계속해서 너를 다른 무언가로 만들려는 세상에서 자신을 유지하는 것이 가장 큰 성취입니다.",
        writer:"Ralph Waldo Emerso"
    },{
        id_paragraph:5,
        article:"The greatest glory in living lies not in never falling, but in rising every time we fall.",
        ver_ko: "살아가는 데 있어 가장 큰 영광은 결코 넘어지지 않는 데가 아니라 넘어질 때마다 일어나는 데 있습니다.",
        writer:"Nelson Mandela"
    },
]

// diary 데이터
export const diaryDatas = [
    {
      id_diary: 1,
      id_emotion: 14,
      id_user: 1,
      contents: "그냥 너무 사는게 우울하고 슬프다ㅠㅠ",
      date: "2024-06-20"
    },
    {
      id_diary: 2,
      id_emotion: 1,
      id_user: 1,
      contents: "행복해!",
      date: "2024-07-04"
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
// idask = id_user + 각 문항 번호(기본키로사용하면서 검색도 쉬움..?)
// ask에서 문항 검색하려니 이렇게 생각함
export const ListData = [
    {
        id_ask:11,
        id_user:1,
        content:"22:00",
        isdone:0
    },{
        id_ask:12,
        id_user:1,
        content:"06:00",
        isdone:0
    },{
        id_ask:13,
        id_user:1,
        content:30,
        isdone:0
    },{
        id_ask:14,
        id_user:1,
        content:"맛있는거 먹기",
        isdone:0
    },{
        id_ask:15,
        id_user:1,
        content: "달리기",
        isdone:0
    },{
        id_ask:16,
        id_user:1,
        content:3,
        isdone:0
    },{
        id_ask:17,
        id_user:1,
        content:"식사 챙겨 먹기",
        isdone:0
    },{
        id_ask:18,
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

  export const onListCreate = (dispatch) => (id_ask, id_user, content, isdone) => {
    // console.log("data",id_ask, id_user, content, isdone)
    dispatch({
      type: "CREATEList",
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
        case "CREATEList": {
            console.log("list create", [action.data, ...state])
            return [action.data, ...state]
        }
        case "DELETE": {
            return state.filter((it) => String(it.id) !== String(action.targetId));
        }
        default: {
            return state;
        }
    }
}


export function FindData(datas){
    return datas.filter(item => item.id_user === user_id);
}