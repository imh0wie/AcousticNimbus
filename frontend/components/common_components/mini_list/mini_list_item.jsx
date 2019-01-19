import React from "react";
import { Link } from "react-router-dom";

const MiniListItem = (props) => {
    return (
        <li>
            <img src={props.song ? props.song.imageURL : window.song_dp}></img>
            <div className="song-info">
                <Link to={`/users/${props.song.artistId}`}>{props.song.artist}</Link>
                <Link to={`/songs/${props.song.id}`} className="title">{props.song.title.length > 24 ? props.song.title.slice(0,24) + "..." : props.song.title}</Link>
                <div className="social-info">
                    <p><i className="fas fa-heart"></i> {props.song.likesCount}</p>
                    <p><i className="fas fa-comment-alt"></i> {props.song.commentsCount}</p>
                </div>
            </div>
        </li>
    );
}

export default MiniListItem;