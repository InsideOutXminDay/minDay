
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


export const getDiaryData =  () => {
    // Fetch the diary data from the public folder
    const fetchData = async () => {
        // JSON 파일에서 데이터 가져오기
        const response = await fetch('/datas/diary.json');
        const jsonData = await response.json();
  
        // 로컬스토리지에서 데이터 가져오기
        const diaryString = window.localStorage.getItem('diary');
        const diaryObj = diaryString ? [JSON.parse(diaryString)] : [];
  
        // JSON 파일 데이터와 로컬스토리지 데이터를 병합
        const combinedData = [...jsonData, ...diaryObj];
        return combinedData;
      };
      const data =  fetchData();
      return data;
}