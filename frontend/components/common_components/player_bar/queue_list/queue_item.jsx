import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import HoverButtons from "../../../common_components/hover_buttons";


const msp = (state) => {
    return {
        currentSong: state.ui.currentSong,
    }
}

const QueueItem = (props) => {
    const current = {
        color: "#FB5400",
    }
    return (
        <li>
            {/* <img src={props.song.imageURL}></img> */}
            <HoverButtons klass="queue-item" song={props.song}/>
            <div className="info-container">
                <Link to={`/songs/${props.song.id}`} style={props.currentSong.song && props.currentSong.song.id === props.song.id ? current : {}}>{props.song.title}</Link>
                <Link to={`/users/${props.song.artistId}`} style={props.currentSong.song && props.currentSong.song.id === props.song.id ? current : {}}>{props.song.artist}</Link>
            </div>
        </li>
    );
}

export default withRouter(connect(msp, null)(QueueItem));