import { useEffect, useState } from 'react';
import '../styles/Paragraph.css'
import { ParagraphDatas } from '../util'
export default function Paragraph(){
    const [paragraph, setParagraph] = useState(null);
    
    useEffect(() => {
        const p_num = Math.floor(Math.random() * ParagraphDatas.length);
        setParagraph(ParagraphDatas[p_num]);
    }, []);

    return(
        <div className='Paragraph'>
            <div className='para en'>
                {paragraph ? paragraph.article : "No article available"}
            </div>
            <div className='para ko'>
                {paragraph ? paragraph.ver_ko : "No article available"}
            </div>
            <div className='para writer'>
                -{paragraph ? paragraph.writer : "No writer available"}-
            </div>

        </div>
    )
}