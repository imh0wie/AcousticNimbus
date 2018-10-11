// import React from 'react';
// // import TrackLoader from './loader.jsx';
// import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";
// import { waveFormSeek, setCurrentTrack, setTrackDuration } from '../../actions/player_actions';
// import { createTrackPlay } from '../../actions/track_play_actions';
// import WaveSurfer from "wavesurfer.js";
// import WaveForm from './wave_form';

// const msp = (state, ownProps) => {
//   const player = state.ui.player;
//   const trackQueue = player.trackQueue;
//   const currentTrackId = trackQueue.queue[trackQueue.currentQueueIdx];
//   const trackPlayData = player.trackPlayData;
//   const controls = player.controls;
//   return {
//     // isCurrentTrack: currentTrackId === ownProps.track.id,
//     // playing: controls.playing,
//     // buffering: controls.buffering,
//     // lastPlayerSeek: controls.lastPlayerSeek,
//     // loggedIn: !!state.session.id,
//     // duration: trackPlayData.duration[ownProps.track.id],
//     // lastProgressStamp: trackPlayData.progress[ownProps.track.id]
//   };
// };

// const mdp= (dispatch, ownProps) => {
//   return {
//     // waveFormSeek: (progress) => dispatch(waveFormSeek(progress)),
//     // setCurrentTrack: (trackId, progress) => dispatch(setCurrentTrack(trackId, progress)),
//     // createTrackPlay: (trackId) => dispatch(createTrackPlay(trackId)),
//     // setTrackDuration: (trackId, duration) => dispatch(setTrackDuration(trackId, duration))
//   };
// };

// class WaveForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.waveFormid = `waveform${this.props.track.id}`;
//     this.width = (this.props.divClass === "waveform-index" )? 600 : 800;
//     this.state = { loaded: false };
//     this.handleReady = this.handleReady.bind(this);
//     this.handleSeek = this.handleSeek.bind(this);
//   }

//   createWaveForm() {
//     if (this.props.divClass) {
//         this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
//                                               progressColor: '#f50',
//                                               height: 70,
//                                               waveColor: '#666',
//                                               barWidth: 2,
//                                               interact: true
//                                           });
//         break;
//       case "waveform-track-show":
//         this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
//                                               progressColor: '#f50',
//                                               height: 100,
//                                               waveColor: 'white',
//                                               barWidth: 2,
//                                               interact: true
//                                           });
//         break;
//     }
//   }

//   componentDidMount() {
//     this.createWaveForm();
//     this.wavesurfer.load(this.props.track.audioURL);
//     this.wavesurfer.on('ready', this.handleReady);
//     this.wavesurfer.on('seek', this.handleSeek);
//   }

//   handleReady() {
//     this.setState( {loaded: true });
//     this.wavesurfer.setMute();

//     if (!this.props.duration) {
//       this.props.setTrackDuration(this.props.track.id, this.wavesurfer.getDuration());
//     }

//     if (this.props.isCurrentTrack && this.currentPlayerTime()) {
//       this.wavesurfer.seekTo(this.currentPlayerTime());
//       if (this.props.playing && !this.props.buffering) { this.wavesurfer.play(); }
//     } else if (this.props.lastProgressStamp) {
//       this.wavesurfer.seekTo(this.props.lastProgressStamp);
//     }
//   }

//   handleSeek(pos) {
//     if (!this.props.isCurrentTrack && this.props.lastProgressStamp !== pos) {
//       if (this.props.lastProgressStamp === 0) { this.props.createTrackPlay(this.props.track.id); }
//       this.props.setCurrentTrack(this.props.track.id, pos);
//     } else if (this.props.isCurrentTrack &&
//                Math.round(pos * 100) !== Math.round(this.currentPlayerTime() * 100)) {
//       this.props.waveFormSeek(pos);
//     }
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.lastProgressStamp !== this.props.lastProgressStamp) {
//       this.wavesurfer.seekTo(this.props.lastProgressStamp);
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.playing && !nextProps.buffering && nextProps.isCurrentTrack) {
//       this.wavesurfer.play();
//     } else {
//       this.wavesurfer.pause();
//     }

//     if (this.props.isCurrentTrack &&
//         this.props.lastPlayerSeek !== nextProps.lastPlayerSeek) {
//       this.wavesurfer.seekTo(nextProps.lastProgressStamp);
//     } else if (!this.props.isCurrentTrack && nextProps.isCurrentTrack) {
//       this.wavesurfer.seekTo(nextProps.lastProgressStamp);
//     }
//   }

//   componentWillUnmount() {
//     this.wavesurfer.destroy();
//   }

//   currentPlayerTime() {
//     return (this.props.playerRef.currentTime / this.props.playerRef.duration);
//   }

//   renderLoader() {
//     if (!this.state.loaded) {
//       return <TrackLoader width={this.width}></TrackLoader>;
//     }
//   }

//   render() {
//     return (
//       <div className={this.props.divClass} id={this.waveFormid}>
//         {this.renderLoader()}
//       </div>
//     );
//   }
// }

// export default withRouter(connect(msp, mdp)(Waveform))