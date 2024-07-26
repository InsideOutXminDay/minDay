import React, { useState, useEffect } from 'react';
import { IoCaretBackOutline } from 'react-icons/io5';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/community/new.css';
import Header from '../components/Header';
import Snackbar from '@mui/material/Snackbar';


export default function New(props) {

    const [community, setCommunity] = useState("post");
    const [detailNav, setDetailNav] = useState('');
    const [authUser, setAuthUser] = useState('');
    const [open, setOpen] = useState(false);
    const [unCheck, setUnCheck] = useState(<input type="hidden" name="anonymity" value="post" />);
    const location = useLocation();
    const navigate = useNavigate();
    const postInfo = { ...location.state };
    const userID = postInfo.userid ? postInfo.userid : authUser;
    let backButton = postInfo.lastPage;

    console.log(postInfo)
    useEffect(() => {
        const authUser = localStorage.getItem('authUser');
        setAuthUser(authUser);
    }, []);

    const MyCheckbox = (checked) => {
        if (checked) {
            setCommunity('mind');
            setUnCheck(null);
        } else if (!checked) {
            setCommunity('post');
            setUnCheck(<input type="hidden" name="anonymity" value="post" />);
        }
    };

    const newSave = async (item) => {
        let id_user = item.id_user;
        let title = item.title;
        let body = item.body;
        let anonymity = item.anonymity ? 1 : 0;

        await fetch(`${process.env.REACT_APP_API_URL}/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${props.token}`
            },
            body: JSON.stringify({
                id_user: id_user,
                title: title,
                body: body,
                anonymity: anonymity
            })
        }).then(async (response) => {
            if (!response.ok) {
                throw new Error(`error! status: ${response.status}`).catch(
                    error => console.error('Error:', error.message))
            }
            else {
                const data = await response.json();
                setDetailNav(Number(data.id_post));
                setOpen(true)
            }
        })
    }

    const CloseButton = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        } setOpen(false);
    };

    return (
        <>
            <Header userId={userID} logout={props.logout}></Header>
            <div className="new-page">
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    message="게시글이 저장되었습니다."
                    onClose={CloseButton}
                    action={
                        <button color="secondary" size="small" onClick={(e) => {
                            e.preventDefault();
                            CloseButton();
                            navigate(`/detail/${detailNav}`, {
                                state: { lastPage: postInfo.lastPage, userId: userID }
                            });
                        }
                        }>
                            닫기
                        </button>
                    } />
                <form name="newCreate" onSubmit={(e) => {
                    e.preventDefault();
                    let item = {
                        id_user: userID,
                        title: e.target.title.value,
                        body: e.target.body.value,
                        anonymity: e.target.anonymity.value
                    }
                    newSave(item);
                }}>
                    <div id="new-omg"></div>
                    <div className="new-bar">
                        <NavLink to={backButton} state={{ userId: userID, lastPage: postInfo.lastPage }}>
                            <IoCaretBackOutline id="post-back"></IoCaretBackOutline></NavLink>
                        <div className="button-right">
                            <label className="checkbox-right">
                                <input type="checkbox" id="checkboxId" value={community}
                                    onClick={(e) => {
                                        MyCheckbox(e.target.checked);
                                    }} name="anonymity" />익명
                            </label>
                            {unCheck}
                            <span><input type="submit" value="저장하기" id="new-submit" /></span>
                        </div>
                    </div>
                    <div className="new-title-bar"><p>
                        <input type="text" placeholder='TITLE' name="title" /></p>
                    </div>
                    <div className="new-textarea">
                        <p><textarea placeholder='contents' name="body"></textarea></p>
                    </div>
                </form>
            </div>
        </>
    );
}
