import { useEffect, useState } from 'react';
import '../../styles/HomexDiary/Paragraph.css'
import { ParagraphDatas } from '../../util'
import axios from 'axios';

export default function Paragraph(){
    const [paragraph, setParagraph] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:5000/paragraphs')
            .then((res) => {
                setParagraph(res.data)
            }
            ).catch(error => console.error('Error:', error));
    }, []);
    const p_num = Math.floor(Math.random() * ParagraphDatas.length);
    return(
        <div className='Paragraph'>
            <div className='para en'>
                {paragraph ? paragraph[p_num].article : "No article available"}
            </div>
            <div className='para ko'>
                {paragraph ? paragraph[p_num].ver_ko : "No article available"}
            </div>
            <div className='para writer'>
                -{paragraph ? paragraph[p_num].writer : "No writer available"}-
            </div>

        </div>
    )
}