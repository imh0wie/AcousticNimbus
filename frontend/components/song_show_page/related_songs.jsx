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
        fetchRelatedSongsByGenre: (data) => dispatch(fetchRelatedSongsByGenre(data)),
    })
}

class RelatedSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        const songData = {
            genre: this.props.song.genre,
            songId: this.props.songId,
        }
        this.props.fetchRelatedSongsByGenre(songData);
        this.setState({
            loading: false,
        });
    }

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