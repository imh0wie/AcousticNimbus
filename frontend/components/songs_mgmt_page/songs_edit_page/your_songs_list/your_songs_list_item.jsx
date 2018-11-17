import React from "react";
import { withRouter } from "react-router-dom";
import { generateSongLength, generateCreationTime } from "../../../../util/general_api_util";
import HoverButtons from "../../../common_components/hover_buttons";

const YourSongsListItem = (props) => {
    return (
        <li>
            <div className="left">
                <img src={props.song.imageURL ? props.song.imageURL : window.song_dp}></img>
                <div className="song-info">
                    <p className="artist">{props.song.artist.length > 30 ? `${props.song.artist.slice(0, 30)}...` : props.song.artist}</p>
                    <p className="title">{props.song.title.length > 30 ? `${props.song.title.slice(0, 30)}...` : props.song.title}</p>
                    <div className="social-info">
                        <p><i className="fas fa-heart"></i></p>
                        <p><i className="fas fa-comment-alt"></i></p>
                    </div>
                </div>
            </div>
            <div className="right">
                <HoverButtons songId={props.song.id} />
                <p className="song-length"></p>
                <p>{generateCreationTime(props.song.createdAt)}</p>
            </div>
        </li>
    );
}

export default withRouter(YourSongsListItem);