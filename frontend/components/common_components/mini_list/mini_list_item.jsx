import React from "react";
import { Link } from "react-router-dom";

class MiniListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        debugger
        return (
            <li>
                <img src={this.props.song ? this.props.song.imageURL : window.song_dp}></img>
                <div className="song-info">
                    <Link to={`/users/${this.props.song.artistId}`}>{this.props.song.artist}</Link>
                    <Link to={`/songs/${this.props.song.id}`} className="title">{this.props.song.title.length > 24 ? this.props.song.title.slice(0,24) + "..." : this.props.song.title}</Link>
                    <div className="social-info">
                        <p><i className="fas fa-heart"></i> {this.props.songLikes.length}</p>
                        <p><i class="fas fa-comment-alt"></i> {this.props.songComments.length}</p>
                    </div>
                </div>
            </li>
        );
    }
}

export default MiniListItem;
// 14 12.25