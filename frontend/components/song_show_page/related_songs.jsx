import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { emptyRelatedSongsByGenre, fetchRelatedSongsByGenre } from "../../actions/song_actions";
import MiniList from "../common_components/mini_list/mini_list";

const msp = (state) => {
    const songs = state.entities.songs;
    return ({
        songs: songs,
        relatedSongs: songs && songs.relatedSongsByGenre ? Object.values(songs.relatedSongsByGenre) : null,
    });
}

const mdp = (dispatch) => {
    return ({
        emptyRelatedSongsByGenre: (defaultState) => dispatch(emptyRelatedSongsByGenre(defaultState)),
        fetchRelatedSongsByGenre: (genre) => dispatch(fetchRelatedSongsByGenre(genre)),
    })
}

class RelatedSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            // relatedSongs: null,
        }
        // this.state = {
        //     counter: 0,
        //     loading: true,
        //     relatedSongs: null,
        // }
    }

    componentDidMount() {
        const songData = {
            genre: this.props.song.genre,
            songId: this.props.songId,
        }
        this.props.fetchRelatedSongsByGenre(songData)//.then(
            this.setState({
                loading: false,
            })
        //)
    }

    // componentDidMount() {
    //     const defaultState = {
    //         followedSongs: this.props.songs ? this.props.songs.likedSongs : null,
    //         likedSongs: this.props.songs ? this.props.songs.likedSongs : null,
    //         songsOfSpecificUser: this.props.songs ? this.props.songs.songsOfSpecificUser : null,
    //         likedSongsOfSpecificUser: this.props.songs ? this.props.songs.likedSongsOfSpecificUser : null,
    //         individualSong: this.props.songs ? this.props.songs.individualSong : null,
    //         relatedSongsByGenre: null,
    //     };
    //     // if (this.props.songs.relatedSongsByGenre) 
    //     this.props.emptyRelatedSongsByGenre(defaultState);
    // }

    // componentWillReceiveProps(nextProps) {
    //     // if (!this.props.songs.relatedSongsByGenre && nextProps.songs && Object.keys(nextProps.songs).includes("commentsOfSpecificSong") && !nextProps.songs.relatedSongsByGenre) {
    //     if (this.state.counter === 0) {
    //         this.props.fetchRelatedSongsByGenre(this.props.song.genre);
    //         this.setState({
    //             counter: this.state.counter + 1,
    //         });
    //     } else if (!this.props.songs.relatedSongsByGenre && nextProps.songs.relatedSongsByGenre) {
    //     // } else if ((!this.props.songs.commentsOfSpecificSong && nextProps.songs.commentsOfSpecificSong) || (this.props.songs && this.props.songs.commentsOfSpecificSong && nextProps.songs && nextProps.songs.commentsOfSpecificSong && Object.keys(this.props.songs.commentsOfSpecificSong).length !== Object.keys(nextProps.songs.commentsOfSpecificSong).length)) {
    //         this.setState({
    //             loading: false,
    //             relatedSongs: Object.values(nextProps.songs.relatedSongsByGenre),
    //         });
    //     }
    // }
    componentWillUnMount() {
        const defaultState = {
            relatedSongsByGenre: null,
        };
        this.props.emptyRelatedSongsByGenre(defaultState);
    }

    renderList() {
        if (this.state.loading || !this.props.relatedSongs) {
            return <img src={window.loadingPizza} className="loading"></img>;
        } else {
            return <MiniList klass="song-show-page" relatedSongs={this.props.relatedSongs}/>;
        }
    }

    render() {
        return (
            <div className="related-songs">
                <div className="header"> 
                    <p><i className="fas fa-music"></i> Related Songs</p>
                    <Link to="" onClick={(e) => e.preventDefault()}>View All</Link>
                </div>
                {this.renderList()}
            </div>
        );
    }
}

export default withRouter(connect(msp, mdp)(RelatedSongs));