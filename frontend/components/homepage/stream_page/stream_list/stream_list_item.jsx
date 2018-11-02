import React from "react";
import { likeOf, likesOf } from "../../../../util/like_api_util";
import Player from "../../../common_components/player";

class StreamListItem extends React.Component {
    constructor(props) {
        super(props);
        // this.redirectToShowPage = this.redirectToShowPage.bind(this);
        // this.togglePlay = this.togglePlay.bind(this);
        // this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this);
        this.renderItemCreationTime = this.renderItemCreationTime.bind(this);
    }

    renderItemCreationTime(date) {
        const itemLife = Math.abs(new Date() - new Date(date)) / 1000;
        if (itemLife < 60) {
            const unit = Math.floor(itemLife) > 1 ? "seconds" : "second";
            return `${Math.floor(itemLife)} ${unit} ago`;
        } else if (itemLife < 3600) {
            const unit = Math.floor(itemLife / 60) > 1 ? "minutes" : "minute";
            return `${Math.floor(itemLife / 60)} ${unit} ago`;
        } else if (itemLife < 86400) {
            const unit = Math.floor(itemLife / 3600) > 1 ? "hours" : "hour";
            return `${Math.floor(itemLife / 3600)} ${unit} ago`;
        } else if (itemLife < 2592000) {
            const unit = Math.floor(itemLife / 86400) > 1 ? "days" : "day";
            return `${Math.floor(itemLife / 86400)} ${unit} ago`;
        } else if (itemLife < 31104000) {
            const unit = Math.floor(itemLife / 2592000) > 1 ? "months" : "month";
            return `${Math.floor(itemLife / 2592000)} ${unit} ago`;
        } else {
            const unit = Math.floor(itemLife / 31104000) > 1 ? "years" : "year";
            return `${Math.floor(itemLife / 31104000)} ${unit} ago`;
        }
    }

    render() {
        return (
            <li className="stream-list-item">
                <div className="header">
                    <img src={this.props.itemArtist.imageURL ? this.props.itemArtist.imageURL : window.default_avatar}/>
                    <p><span>{this.props.itemArtist.username}</span> posted a song {this.renderItemCreationTime(this.props.itemSong.createdAt)}</p> 
                </div>
                <Player
                    klass="item-player"
                    song={this.props.itemSong}
                    songId={this.props.itemSong.id}
                    currentLikes={this.props.itemLikes}
                    currentComments={this.props.itemComments}
                    currentSong={this.props.currentSong}
                    setCurrentSong={this.props.setCurrentSong}
                    playSong={this.props.playSong}
                    pauseSong={this.props.pauseSong}
                />
            </li>
        );
    }
}

export default StreamListItem;
