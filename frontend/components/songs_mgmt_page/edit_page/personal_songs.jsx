// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { fetchSongs } from "../../../actions/song_actions";
// import { setCurrentSong, playSong, pauseSong } from "../../../actions/current_song_actions";
// import { latest } from "../../../util/song_api_util";

// const msp = (state) => {
//     return {
//       songs: latest(12, state.entities.songs),
//       currentUser: state.entities.users[state.session.id],
//       currentSong: state.ui.currentSong,
//     };
// };

// const mdp = (dispatch) => {
//     return ({
//         fetchSongs: () => dispatch(fetchSongs()),
//         setCurrentSong: (song) => dispatch(setCurrentSong(song)),
//         playSong: () => dispatch(playSong()),
//         pauseSong: () => dispatch(pauseSong()),
//     });
// };
// class PersonalSongs extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     componentWillMount() {
//         this.props.fetchSongs();
//     }

//     render() {
        
//     }
// }

// export default withRouter(connect(msp, mdp)(PersonalSongs))