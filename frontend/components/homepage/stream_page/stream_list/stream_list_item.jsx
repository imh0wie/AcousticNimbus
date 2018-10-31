import React from "react";

class StreamListItem extends React.Component {
    constructor(props) {
        super(props);
        // this.redirectToShowPage = this.redirectToShowPage.bind(this);
        // this.togglePlay = this.togglePlay.bind(this);
        // this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this);
        this.renderItemCreationTime = this.renderItemCreationTime.bind(this);
    }
    
    // togglePlay(song) {
    //     // debugger
    //     if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id ) {
    //         // debugger
    //         this.props.setCurrentSong(song);
    //         this.props.playSong();
    //     } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
    //         // debugger
    //         this.props.pauseSong();
    //     } else if (song.id === this.props.currentSong.song.id && !this.props.currentSong.playing) {
    //         // debugger
    //         this.props.playSong();
    //     }
    // }

//   renderPlayPauseSign(song) {
//     // debugger
//     if (!this.props.currentSong.song || song.id !== this.props.currentSong.song.id || !this.props.currentSong.playing) {
//         // debugger
//         return (
//             <div className="charts-songs-list-item-play-container">
//                 <img src={window.play_button} className="charts-songs-list-item-play-sign" onClick={() => this.togglePlay(song)} />
//             </div>
//         );
//     } else if (song.id === this.props.currentSong.song.id && this.props.currentSong.playing) {
//         // debugger
//         return (
//             <div className="charts-songs-list-item-pause-container">
//                 <img src={window.pause_button} className="charts-songs-list-item-pause-sign" onClick={() => this.togglePlay(song)} />
//             </div>
//         );
//     }
//   }

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
        } else if (itemLife < 604800) {
            const unit = Math.floor(itemLife / 86400) > 1 ? "days" : "day";
            return `${Math.floor(itemLife / 86400)} ${unit} ago`;
        // } else if (itemLife < 2592000) {
        //     return `${Math.floor(itemLife / 604800)}w ago`;
        } else if (itemLife < 31104000) {
            const unit = Math.floor(itemLife / 2592000) > 1 ? "months" : "month";
            return `${Math.floor(itemLife / 2592000)} ${unit} ago`;
        } else {
            const unit = Math.floor(itemLife / 31104000) > 1 ? "years" : "year";
            return `${Math.floor(itemLife / 31104000)} ${unit} ago`;
        }
    }

    render() {
        debugger
        return (
            <li className="stream-list-item">
                <div className="header">
                    <img src={this.props.artist.imageURL ? this.props.artist.imageURL : window.default_avatar}/>
                    <p><span>{this.props.artist.username}</span> posted a song {this.renderItemCreationTime(this.props.song.createdAt)}</p> 
                </div>
                <div className="content">
                    <img src={this.props.song.imageURL ? this.props.song.imageURL : window.default_avatar}/>
                </div>
            </li>
        );
    }
}

export default StreamListItem;
