import React, { useState, useEffect } from 'react';
import { IoCaretBackOutline } from 'react-icons/io5';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/community/edit.css';
import Header from '../components/Header';
import Snackbar from '@mui/material/Snackbar';


export default function Edit(props) {

    const location = useLocation();
    const postInfo = { ...location.state };
    const [newTitle, setTitle] = useState(postInfo.title);
    const [newBody, setBody] = useState(postInfo.body);
    let backButton = postInfo.id_post;
    const navigate = useNavigate();
    const [userID, setUserID] = useState(postInfo.id_user);
    const [open, setOpen] = useState(false);
    const [editNav, setEditNav] = useState('');

    const goTodetail = (item) => {
        navigate(`/detail/${item.id_post}`, {
            state: {
                id_post: item.id_post,
                id_user: item.id_user,
                title: item.title,
                body: item.body,
                anonymity: item.anonymity,
            },
        });
    };


    const editSave = (item) => {
        let id_post = item.id_post;
        let title = item.title;
        let body = item.body;
        fetch(`${process.env.REACT_APP_API_URL}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${props.token}`
            },
            body: JSON.stringify({
                id_post: id_post,
                title: title,
                body: body
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            return response.json();
        }).catch(error => console.error('Error:', error.message)).then(
            setOpen(true)
        );
        setEditNav(id_post)
    }

    const CloseButton = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        } setOpen(false);
    };

    return (
        <div>
            <Header userId={userID} logout={props.logout} />
            <div className="edit-page">
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    message="게시글이 수정되었습니다."
                    onClose={CloseButton}
                    action={
                        <button color="secondary" size="small" onClick={(e) => {
                            e.preventDefault();
                            CloseButton();
                            navigate(`/detail/${editNav}`);
                        }}>
                            닫기
                        </button>
                    } />
                <form name="editCreate"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                    <div id="edit-omg"></div>
                    <div className="edit-bar">
                        <NavLink to={"/detail/" + backButton} onClick={(e) => {
                            e.preventDefault(); goTodetail(postInfo);
                        }}><IoCaretBackOutline id="new-back"></IoCaretBackOutline></NavLink>
                        <div className="button-right">
                            <span><input type="submit" value="저장하기" id="new-submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (Number(postInfo.id_user) === Number(userID)) {
                                        let item = {
                                            id_post: postInfo.id_post,
                                            id_user: postInfo.id_user,
                                            title: newTitle,
                                            body: newBody,
                                            anonymity: postInfo.anonymity
                                        }
                                        editSave(item);
                                    }
                                }} /></span>
                        </div>
                    </div>
                    <div className="edit-title-bar"><p>
                        <input type="text" placeholder='TITLE' name="title" value={newTitle}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }} /></p>
                    </div>
                    <div className="edit-textarea">
                        <p><textarea placeholder='contents' name="body" value={newBody}
                            onChange={(e) => {
                                setBody(e.target.value);
                            }}></textarea></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
