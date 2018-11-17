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

export const removeSong = (idToServer) => {
  return dispatch => {
      return SongAPIUtil.removeSong(idToServer).then(
          (songsFromServer) => {
              return dispatch(receiveSongs(songsFromServer));
          }
      );
  };
};

export const fetchSong = (songToServerId) => {
  return dispatch => {
    return SongAPIUtil.fetchSong(songToServerId).then(
      (songFromServer) => {
        return dispatch(receiveSong(songFromServer));
      },
      (errors) => {
        return dispatch(receiveSongErrors(errors.responseJSON));
      }
    );
  };
};

export const fetchSongs = () => {
  return (dispatch) => {
    return SongAPIUtil.fetchSongs().then(
      (songsFromServer) => {
        return dispatch(receiveSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

const receiveSong = ({ song }) => {
  return {
    type: RECEIVE_SONG,
    song: song,
  };
};

const receiveSongs = (songs) => {
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
