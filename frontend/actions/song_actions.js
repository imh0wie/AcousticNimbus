import * as SongAPIUtil from "../util/song_api_util";

export const RECEIVE_SONG = "RECEIVE_SONG";
export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const RECEIVE_INTRO_SONGS = "RECEIVE_INTRO_SONGS";
export const RECEIVE_FOLLOWED_SONGS = "RECEIVE_FOLLOWED_SONGS";
export const RECEIVE_LIKED_SONGS = "RECEIVE_LIKED_SONGS";
export const RECEIVE_FOLLOWED_AND_LIKED_SONGS = "RECEIVE_FOLLOWED_AND_LIKED_SONGS";
export const RECEIVE_SONGS_OF_SPECIFIC_USER = "RECEIVE_SONGS_OF_SPECIFIC_USER";
export const RECEIVE_RELATED_SONGS_BY_GENRE = "RECEIVE_RELATED_SONGS_BY_GENRE";
export const RECEIVE_SONG_ERRORS = "RECEIVE_SONG_ERRORS";
export const RECEIVE_SONGS_ERRORS = "RECEIVE_SONGS_ERRORS";
export const EMPTY_INTRO_SONGS = "EMPTY_INTRO_SONGS";
export const EMPTY_SONGS_OF_SPECIFIC_USER = "EMPTY_SONGS_OF_SPECIFIC_USER";
export const EMPTY_LIKED_SONGS_OF_SPECIFIC_USER = "EMPTY_LIKED_SONGS_OF_SPECIFIC_USER";
export const EMPTY_FOLLOWED_SONGS = "EMPTY_FOLLOWED_SONGS";
export const EMPTY_LIKED_SONGS = "EMPTY_LIKED_SONGS";
export const EMPTY_FOLLOWED_AND_LIKED_SONGS = "EMPTY_FOLLOWED_AND_LIKED_SONGS";
export const EMPTY_INDIVIDUAL_SONG = "EMPTY_INDIVIDUAL_SONG";
export const EMPTY_RELATED_SONGS_BY_GENRE = "EMPTY_RELATED_SONGS_BY_GENRE";

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

export const fetchRelatedSongsByGenre = (songDataToServer) => {
  return dispatch => {
    return SongAPIUtil.fetchRelatedSongsByGenre(songDataToServer).then(
      (songsFromServer) => {
        return dispatch(receiveRelatedSongsByGenre(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongErrors(errors.responseJSON));
      }
    );
  };
};

export const fetchIntroSongs = (numberToServer) => {
  return (dispatch) => {
    return SongAPIUtil.fetchSongs(numberToServer).then(
      (songsFromServer) => {
        return dispatch(receiveIntroSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const fetchSongsOfSpecificUser = (userId) => {
  return (dispatch) => {
    return SongAPIUtil.fetchSongsOfSpecificUser(userId).then(
      (songsFromServer) => {
        return dispatch(receiveSongsOfSpecificUser(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const fetchLikedSongsOfSpecificUser = (userId, fetchingLikes) => {
  return (dispatch) => {
    return SongAPIUtil.fetchLikedSongsOfSpecificUser(userId, fetchingLikes).then(
      (songsFromServer) => {
        return dispatch(receiveSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const fetchFollowedAndLikedSongs = (userId) => {
  return (dispatch) => {
    return SongAPIUtil.fetchFollowedAndLikedSongs(userId).then(
      (songsFromServer) => {
        return dispatch(receiveFollowedAndLikedSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const fetchFollowedSongs = (userId) => {
  return (dispatch) => {
    return SongAPIUtil.fetchFollowedSongs(userId).then(
      (songsFromServer) => {
        return dispatch(receiveFollowedSongs(songsFromServer));
      },
      (errors) => {
        return dispatch(receiveSongsErrors(errors.responseJSON));
      },
    );
  };
};

export const fetchLikedSongs = (userId) => {
  return (dispatch) => {
    return SongAPIUtil.fetchLikedSongs(userId).then(
      (songsFromServer) => {
        return dispatch(receiveLikedSongs(songsFromServer));
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

export const emptyLikedSongsOfSpecificUser = (defaultState) => {
  return {
    type: EMPTY_LIKED_SONGS_OF_SPECIFIC_USER,
    defaultState: defaultState,
  };
};

export const emptyIntroSongs = (defaultState) => {
  return {
    type: EMPTY_INTRO_SONGS,
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

export const emptyFollowedAndLikedSongsOf = (defaultState) => {
  return {
    type: EMPTY_FOLLOWED_AND_LIKED_SONGS,
    defaultState: defaultState,
  };
};

export const emptyIndividualSong = (defaultState) => {
  return {
    type: EMPTY_INDIVIDUAL_SONG,
    defaultState: defaultState,
  };
};

export const emptyRelatedSongsByGenre = (defaultState) => {
  return {
    type: EMPTY_RELATED_SONGS_BY_GENRE,
    defaultState: defaultState,
  };
};

const receiveSong = (song) => {
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

const receiveIntroSongs = (songs) => {
  return {
    type: RECEIVE_INTRO_SONGS,
    songs: songs,
  };
};

const receiveFollowedSongs = (songs) => {
  return {
    type: RECEIVE_FOLLOWED_SONGS,
    songs: songs,
  };
};

const receiveLikedSongs = (songs) => {
  return {
    type: RECEIVE_LIKED_SONGS,
    songs: songs,
  };
};

const receiveFollowedAndLikedSongs = (songs) => {
  return {
    type: RECEIVE_FOLLOWED_AND_LIKED_SONGS,
    songs: songs,
  };
};

const receiveSongsOfSpecificUser = (songs) => {
  return {
    type: RECEIVE_SONGS_OF_SPECIFIC_USER,
    songs: songs,
  };
};

const receiveRelatedSongsByGenre = (songs) => {
  return {
    type: RECEIVE_RELATED_SONGS_BY_GENRE,
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
