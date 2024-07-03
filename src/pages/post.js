import React from "react";
import '../styles/post.css';

export default function Post() {
    let img = null;
    return (
        <div className="post-page">
            <div className="post-card">
                <h2>test</h2>
                {img}
                <text>test test test test test test </text>
            </div>
            <div className="post-card">
                <h2>test</h2>
                {img}
                <text>test test test test test test </text>
            </div>
            <div className="post-card">
                <h2>test</h2>
                {img}
                <text>test test test test test test </text>
            </div>
        </div>
    )
}