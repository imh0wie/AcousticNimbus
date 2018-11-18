import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { removeSong } from "../../actions/song_actions";
import { toggleReloading } from "../../actions/reloading_actions";

const msp = (state) => {
    return ({
        songs: state.entities.songs,
    });
}

const mdp = (dispatch) => {
    return ({
        removeSong: (id) => dispatch(removeSong(id)),
        toggleReloading: () => dispatch(toggleReloading()),
    });
}

class HoverButtons extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     reloading: false,
        // }
        this.noneStyle = {
            display: "none",
        }
        this.deleteSong = this.deleteSong.bind(this);
    }

    deleteSong() {
        this.props.toggleReloading().then(this.props.removeSong(this.props.songId))
        // this.props.toggleReloading();
        // this.props.removeSong(this.props.songId);
    }
    
    render() {
        // if (this.state.reloading) return <img src={window.loadingCool} className="loading"></img>;
        return (
            <div className="hover-buttons">
                <button style={this.noneStyle}><i className="fas fa-heart"></i></button>
                <button style={this.noneStyle}><i className="fas fa-pen"></i></button>
                <button onClick={() => this.deleteSong()}><i className="fas fa-trash"></i></button>
            </div>
        );
    }
}

export default withRouter(connect(msp, mdp)(HoverButtons));