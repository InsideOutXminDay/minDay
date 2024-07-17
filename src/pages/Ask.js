import { useState, useEffect } from "react";
import StateCheck from "../components/Ask/StateCheck";
import { FindData } from "../util";
import axios from "axios";

export default function Ask(){

    const [initData, setInitData] = useState([]);

    const convertListDataToObject = (arr) => {
        const result = {};
        arr.forEach(item => {
          const { type, ...rest } = item;
          result[type] = rest;
        });
        return result;
      }
      
      useEffect(() => {
        axios.get('http://localhost:4000/api/askcheck')
            .then((res) => {
                const foundData = FindData(res.data)
                setInitData(convertListDataToObject(foundData))
            }
            ).catch(error => console.error('Error:', error));
    }, []);


    const onUpdate = async(id_askcheck, id_user, content, isdone, type) => {
        const address = initData.sleep?'update':'create';
        await fetch(`http://localhost:4000/api/${address}checklist`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_askcheck: id_askcheck,
                id_user: id_user,
                content: content,
                isdone: isdone,
                type: type
            })
        }).then(async(res)=>{
            if(!res.ok){
                throw new Error(`error! status: ${res.status}`)
            }}).catch(error=>console.log('Error:', error.meesage))


        // onListUpdate(id_ask, id_user, content, isdone, type)
        // :onListCreate(id_ask, id_user, content, isdone, type)
    }

    return (
        <div>
            <div className="Ask">
                <div className="logo-section">
                    <img src="/logo_full.png"/>
                    <p>목표를 설정해 만족스러운 하루를 만들어보세요!😊</p>
                </div>
                <StateCheck initData={initData}  onUpdate={onUpdate}/>
            </div>
        </div>
    );
}