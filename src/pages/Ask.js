import { useState, useEffect } from "react";
import StateCheck from "../components/Ask/StateCheck";
import { FindData } from "../util";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Ask({ token }){
    const userId = useParams();
    const [initData, setInitData] = useState([]);

    const convertListDataToObject = (arr) => {
        const result = {};
        arr.forEach(item => {
          const { type, ...rest } = item.Askcheck;
          rest.id_user = item.User.id_user;
          result[type] = rest;
        });
        return result;
      }
      
      useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/askchecks`, {
            headers: { authorization: `Bearer ${token}` },
          })

            .then((res) => {
                const foundData = FindData(res.data,userId.id)
                setInitData(convertListDataToObject(foundData))
            }
            ).catch(error => console.error('Error:', error));
    }, []);


    const onUpdate = async(state) => {
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/updatechecklist`, 
                {state},
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            console.log(res.data)
        }catch(err){
            console.error(err)
        }
    }
    const onCreate = async(state) => {
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/createchecklist`, 
                {userId,state},
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            console.log(res.data)
        }catch(err){
            console.error(err)
        }
    }
    console.log(initData)

    return (
        <div>
            <div className="Ask">
                <div className="logo-section">
                    <img src="/logo_full.png"/>
                    <p>목표를 설정해 만족스러운 하루를 만들어보세요!😊</p>
                </div>
                <StateCheck initData={initData} userId={userId} onUpdate={initData.sleep?onUpdate:onCreate}/>
            </div>
        </div>
    );
}