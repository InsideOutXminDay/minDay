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
        axios.get(`${process.env.REACT_APP_API_URL}/askcheck`)
            .then((res) => {
                const foundData = FindData(res.data)
                setInitData(convertListDataToObject(foundData))
            }
            ).catch(error => console.error('Error:', error));
    }, []);


    const onUpdate = async(id_askcheck, id_user, content, isdone, type) => {
        const address = initData.sleep?'update':'create';
        await fetch(`${process.env.REACT_APP_API_URL}/${address}checklist`, {
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
            <div>
                <StateCheck initData={initData}  onUpdate={onUpdate}/>
            </div>
        </div>
    );
}