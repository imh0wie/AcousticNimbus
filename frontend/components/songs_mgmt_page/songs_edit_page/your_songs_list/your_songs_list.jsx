import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchSongsOfSpecificUser } from "../../../../actions/song_actions"
import { songsOf } from "../../../../util/song_api_util";
import YourSongsListItem from "./your_songs_list_item";

const msp = (state) => {
    const currentUserId = state.session.id;
    return ({
        songs: state.entities.songs,
        // currentSongs: songsOf(currentUserId, state.entities.songs),
        currentUserId: currentUserId,
    });
};

const mdp = (dispatch) => {
    return ({
        fetchSongsOfSpecificUser: (data) => dispatch(fetchSongsOfSpecificUser(data)),
    });
};

class YourSongsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yourSongs: null,
            loading: true,
        }
        // this.state = {
        //     loading: true,
        //     currentSongs: this.props.currentSongs,
        // }
    }

    componentDidMount() {
        this.data = {
            user_id: this.props.currentUserId
        }
        this.props.fetchSongsOfSpecificUser(this.data);
    }

    componentWillReceiveProps(nextProps) {
        if ((!this.state.yourSongs && nextProps.songs.songsOfSpecificUser) || (this.props.songs && nextProps.songs && Object.keys(this.props.songs.songsOfSpecificUser).length !== Object.keys(nextProps.songs.songsOfSpecificUser).length)) {
            this.setState({
                loading: true,
            });
            setTimeout(() => this.setState({
                loading: false,
                yourSongs: Object.values(nextProps.songs.songsOfSpecificUser),
            }), 3000);
        }
    }

    render() {
        if (this.state.loading || !this.state.yourSongs) {
            return <div className="container"><img src={window.loadingCool} className="loading"></img></div>
        } else {
            if (this.state.yourSongs.length === 0) {
                return (
                    <div className="container">
                        <p>You haven't uploaded any songs yet.</p>
                        <Link to="/upload"><button>Upload now</button></Link>
                    </div>
                );
            } else {
                return (
                    <ul>
                        {this.state.yourSongs.map((song, idx) => {
                            return <YourSongsListItem song={song} key={idx}/>;
                        })}
                    </ul>
                );
            }
        }
    }
    
    // componentDidMount() {
    //     // this.props.fetchSongs();
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.currentSongs !== nextProps.currentSongs) {
    //         this.setState({
    //             loading: false,
    //             currentSongs: nextProps.currentSongs,
    //         });
    //     }
    // }

    // render() {
    //     if (this.state.loading || !this.state.currentSongs) return <div className="container"><img src={window.loadingPizza} className="loading"></img></div>;
    //     if (this.state.currentSongs.length === 0) {
    //         return (
    //             <div className="container">
    //                 <p>You haven't uploaded any songs yet.</p>
    //                 <Link to="/upload"><button>Upload now</button></Link>
    //             </div>
    //         );
    //     }
    //     return (
    //         <ul>
    //             {this.state.currentSongs.map((song, idx) => {
    //                 return <YourSongsListItem song={song} key={idx}/>;
    //             })}
    //         </ul>
    //     );
    // }
}

export default withRouter(connect(msp, mdp)(YourSongsList));





