import { useEffect, useState } from 'react';
import '../../styles/HomexDiary/Paragraph.css'
import axios from 'axios';

export default function Paragraph(){
    const [paragraph, setParagraph] = useState(null);
    const [lenOfparagraph,setLength] = useState(0);

    console.log("Paragraph component")
    
    useEffect(() => {
        axios.get('http://localhost:5000/paragraphs')
            .then((res) => {
                setParagraph(res.data)
                console.log("paragraph", paragraph);
            }
            ).catch(error => console.error('Error:', error));        
    }, []);

    useEffect(() => {
        setLength(paragraph?Object.keys(paragraph).length:lenOfparagraph)
    },[paragraph])

    const p_num = Math.floor(Math.random() * lenOfparagraph);
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