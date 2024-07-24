import { useLocation, useNavigate } from "react-router-dom";
import DiaryEditor from "../components/HomexDiary/DiaryEditor"
import Header from "../components/Header"
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewDiary({ token, logout }){
    const [emotionData, setEmotionData] = useState([]);
    const location = useLocation();
    const { date,userId } = location.state || {}; 

    // emotion list 불러오기
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API_URL}/emotionicons`, {
            headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
            setEmotionData(res.data);
        })
        .catch((error) => console.error('Error:', error));
    }, []);
    
    const onSubmit = async(data) => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/creatediary`,
            { data },
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
        } catch (err) {
          console.error(err);
        }}
    return (
        <div style={{display:"flex"}}>
            <Header userId={userId} logout={logout} />
            <DiaryEditor initDate={date} onSubmit={onSubmit} userId={userId} emotionData={emotionData}/>
        </div>
    )
}

