import React from "react";
import { Link, withRouter } from "react-router-dom";
import { generateSongLength, generateCreationTime } from "../../../../util/general_api_util";
import HoverButtons from "../../../common_components/hover_buttons";

const YourSongsListItem = (props) => {
    return (
        <li>
            <div className="left">
                <img src={props.song.imageURL ? props.song.imageURL : window.song_dp}></img>
                <div className="song-info">
                    <Link to={`/users/${props.song.artistId}`} className="artist">{props.song.artist.length > 30 ? `${props.song.artist.slice(0, 30)}...` : props.song.artist}</Link>
                    <Link to={`/songs/${props.song.id}`} className="title">{props.song.title.length > 30 ? `${props.song.title.slice(0, 30)}...` : props.song.title}</Link>
                    <div className="social-info">
                        <p><i className="fas fa-heart"></i> {props.song.likesCount}</p>
                        <p><i className="fas fa-comment-alt"></i> {props.song.commentsCount}</p>
                    </div>
                </div>
            </div>
            <div className="right">
                <HoverButtons klass="your-songs-list-item" song={props.song} songId={props.song.id} />
                <p className="song-length"></p>
                <p>{generateCreationTime(props.song.createdAt)}</p>
            </div>
        </li>
    );
}

export default withRouter(YourSongsListItem);