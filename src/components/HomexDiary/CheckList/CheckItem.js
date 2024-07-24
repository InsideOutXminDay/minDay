import { useState } from 'react';
import '../../../styles/HomexDiary/CheckList/CheckItem.css';
import axios from 'axios';

export default function CheckItem({ token, Askcheck, User }) {
  const [is_done, setIsDone] = useState(Askcheck.isdone);
  const [prevstate, setprevState] = useState({[Askcheck.type]:{id_askcheck: Askcheck.id_askcheck,
    id_user: User.id_user,
    content: Askcheck.content,
    isdone: Askcheck.isdone,
    }})

  
    const onChangeCheckbox = async (checked) => {  
      setIsDone(checked);
      const state = {
        [Askcheck.type]: {
          ...prevstate[Askcheck.type],
          isdone: !is_done
        }
      };
      setprevState(state);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/updatechecklist`,
          {state},
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.error(err);
      }
    };
  

  const sentence = () => {
    switch (Askcheck.type) {
      case 'sleep':
        return `${Askcheck.content}시에 취침`;
      case 'wake':
        return `${Askcheck.content}시에 기상`;
      case 'phone':
        return `${Askcheck.content}시간 이하의 도파민 섭취`;
      case 'exercise':
        return `${Askcheck.content}시간 이상 운동하기`;
      case 'satisfaction':
      case 'hobby':
      case 'meal':
      case 'rest':
        return Askcheck.content;
      default:
        return '';
    }
  };
  return (
    <div className="CheckItem">
      <div className="checkbox-col">
        <input
          onChange={()=>{onChangeCheckbox(!is_done)}}
          type="checkbox"
          checked={is_done}
        ></input>
      </div>
      <div className="content-col">{sentence()}</div>
    </div>
  );
}
