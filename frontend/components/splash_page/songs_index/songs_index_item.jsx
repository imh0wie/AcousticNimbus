import React from "react";

class SongsIndexItem extends React.Component {
    constructor(props) {
        super(props);
        // this.renderPlayPauseSign = this.renderPlayPauseSign.bind(this); 
        // this.togglePlay = this.togglePlay.bind(this);
      }
    
    //   componentWillReceiveProps(newProps) {
    //     if (newProps.currentSong.song.id === newProps.song.id && newProps.currentSong.playing) {

    //     } else {
    //       this.setState({ playing: false, playButtonClass: 'landing-play-button' });
    //     }
    //   }
    
    //   togglePlay(song) {
    //     if (!this.props.currentSong.song) {
            
    //     }
    //     if (this.props.currentSong.song.id === -1 ||
    //       this.props.currentSong.song.id !== this.props.song.id) {
    //       this.props.receiveCurrentTrack(this.props.song);
    //     }
    //     if (this.props.currentSong.song.id !== this.props.song.id &&
    //       this.props.currentSong.playing) {
    //     } else {
    //       this.props.pausePlayTrack(!this.props.currentSong.playing);
    //     }
    //   }

    //   renderPlayPauseSign() {
    //     if (!this.props.currentSong.playing) {
    //         return (
                // <div className="splash-page-songs-index-item-play-sign-container">
                //     <img src={window.play_button} className="splash-page-songs-index-item-play-sign" onClick={this.togglePlay()} />
                // </div>
    //         );
    //     } else {
    //         return (
    //             <div className="splash-page-songs-index-item-play-sign-continer">
    //                 <img src={window.pause_button} className="splash-page-songs-index-item-pause-sign" onClick={this.togglePlay} />
    //             </div>
    //         );
    //     }
    //   }
    
      render () {
        const { song } = this.props;
        return (
          <li className="splash-page-songs-index-item">
            <div className="splash-page-songs-index-item-img-container">
                <img src={window.dogs} className="splash-page-songs-index-item-img" />
                <div className="splash-page-songs-index-item-play-sign-container">
                    <img src={window.play_button} className="splash-page-songs-index-item-play-sign" />
                </div>
            </div>
            <h4 className="splash-page-songs-index-item-title">
              {song.title.length >= 23 ? song.title.slice(0, 23) + "..." : song.title}
            </h4>
            <p className="splash-page-songs-index-item-artist">{song.artist}</p>
          </li>
        );
    }
    
}

export default SongsIndexItem;
{/* <img className="splash-page-songs-index-item-img" src={song.album_url} alt="album-cover"/> */}
// onClick={this.togglePlay()} 