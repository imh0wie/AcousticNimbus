import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { removeSong } from "../../actions/song_actions";

const msp = (state) => {
    return ({
    });
}

const mdp = (dispatch) => {
    return ({
        removeSong: (id) => dispatch(removeSong(id)),
    });
}

const HoverButtons = (props) => {
    const noneStyle = {
        display: "none",
    }
    const songId = props.songId;
    // debugger
    return (
        <div className="hover-buttons">
            <button style={noneStyle}><i className="fas fa-heart"></i></button>
            <button style={noneStyle}><i className="fas fa-pen"></i></button>
            <button onClick={(songId) => props.removeSong(songId)}><i className="fas fa-trash"></i></button>
        </div>
    );
}

export default withRouter(connect(msp, mdp)(HoverButtons));