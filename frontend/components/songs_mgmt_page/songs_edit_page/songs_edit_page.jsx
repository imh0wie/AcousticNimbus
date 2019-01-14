import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleReloading } from "../../../actions/reloading_actions";
import YourSongsList from "./your_songs_list/your_songs_list"

const msp = (state) => {
    return ({
        songs: state.entities.songs,
        reloading: state.ui.reloading,
    })
}

const mdp = (dispatch) => {
    return ({
        toggleReloading: () => dispatch(toggleReloading()),
    })
}

class SongsEditPage extends React.Component {
    constructor(props) {
        super(props);
        // this.noneStyle = {
        //     display: "none",
        // }
    }
    
    componentWillReceiveProps(nextProps) {
        
    }
    
    render() {
        return (
            <div className="songs-edit-page">
                <header>Your songs</header>
                <div className="bar">
                </div>
                <YourSongsList />
            </div>
        );
    }
    
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.reloading && this.props.songs !== nextProps.songs) {
    //         this.props.toggleReloading();
    //     }
    // }
    
    // render() {
    //     return (
    //         <div className="songs-edit-page">
    //             <header>Your songs <img src={window.loadingCool} className="loading" style={this.props.reloading ? {} : this.noneStyle}></img></header>
    //             <div className="bar">
    //             </div>
    //             <YourSongsList />
    //         </div>
    //     );
    // }
}

export default withRouter(connect(msp, mdp)(SongsEditPage));

