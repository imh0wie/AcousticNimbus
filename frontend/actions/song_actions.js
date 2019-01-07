import * as SongAPIUtil from "../util/song_api_util";

export const RECEIVE_SONG = "RECEIVE_SONG";
export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_SONG_ERRORS = "RECEIVE_SONG_ERRORS";
export const RECEIVE_SONGS_ERRORS = "RECEIVE_SONGS_ERRORS";
export const EMPTY_SONGS_OF_SPECIFIC_USER = "EMPTY_SONGS_OF_SPECIFIC_USER";
export const EMPTY_FOLLOWED_SONGS = "EMPTY_FOLLOWED_SONGS";
export const EMPTY_LIKED_SONGS = "EMPTY_LIKED_SONGS";

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

export const fetchSong = (songIdToServer) => {
  return dispatch => {
    return SongAPIUtil.fetchSong(songIdToServer).then(
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

export const fetchSongsOf = (userId) => {
  return (dispatch) => {
    return SongAPIUtil.fetchSongsOf(userId).then(
      (songsFromServer) => {
        return dispatch(receiveSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const fetchRelevantSongs = (userId) => {
  return (dispatch) => {
    return SongAPIUtil.fetchRelevantSongsOf(userId).then(
      (songsFromServer) => {
        return dispatch(receiveSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const fetchFollowedSongs = (userId) => {
  return (dispatch) => {
    return SongAPIUtil.fetchFollowedSongsOf(userId).then(
      (songsFromServer) => {
        return dispatch(receiveSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const fetchLikedSongs = (userId) => {
  return (dispatch) => {
    return SongAPIUtil.fetchLikedSongsOf(userId).then(
      (songsFromServer) => {
        return dispatch(receiveSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const emptySongsOfSpecificUser = (defaultState) => {
  return {
    type: EMPTY_SONGS_OF_SPECIFIC_USER,
    defaultState: defaultState,
  };
};

export const emptyFollowedSongs = (defaultState) => {
  return {
    type: EMPTY_FOLLOWED_SONGS,
    defaultState: defaultState,
  };
};

export const emptyLikedSongs = (defaultState) => {
  return {
    type: EMPTY_LIKED_SONGS,
    defaultState: defaultState,
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
