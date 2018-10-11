import * as SongAPIUtil from "../util/song_api_util";

export const RECEIVE_SONG = "RECEIVE_SONG";
export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_SONG_ERRORS = "RECEIVE_SONG_ERRORS";
export const RECEIVE_SONGS_ERRORS = "RECEIVE_SONGS_ERRORS";

export const createSong = (songToServer) => {
  return dispatch => {
    return SongAPIUtil.createSong(songToServer).then(
      (songFromServer) => {
        return dispatch(receiveSong(songFromServer));
      },
      (errors) => {
        return dispatch(receiveSongErrors(errors.responseJSON));
      }
    );
  };
};

export const fetchSong = (songToServerId) => {
  debugger
  return dispatch => {
    debugger
    return SongAPIUtil.fetchSong(songToServerId).then(
      (songFromServer) => {
        debugger
        return dispatch(receiveSong(songFromServer));
      },
      (errors) => {
        debugger
        return dispatch(receiveSongErrors(errors.responseJSON));
      }
    );
  };
};

export const fetchSongs = () => {
  return (dispatch) => {
    return SongAPIUtil.fetchSongs().then(
      (songsFromServer) => {
        debugger
        return dispatch(receiveSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

// What does it do? ==> reducer
const receiveSong = ({ song }) => {
  debugger
  return {
    type: RECEIVE_SONG,
    song: song,
  };
};

const receiveSongs = (songs) => {
  // debugger
  return {
    type: RECEIVE_SONGS,
    songs: songs,
  };
};

const receiveSongErrors = (errors) => {
  return {
    type: RECEIVE_SONG_ERRORS,
    errors: errors,
  };
};

const receiveSongsErrors = (errors) => {
  return {
    type: RECEIVE_SONGS_ERRORS,
    errors: errors,
  };
};