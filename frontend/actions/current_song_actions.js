export const PLAY_SONG = "PLAY_SONG";
export const PAUSE_SONG = "PAUSE_SONG";
export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_ELAPSED_TO = "SET_ELAPSED_TO";
export const RECEIVE_CURRENT_SONG_ERRORS = "RECEIVE_CURRENT_SONG_ERRORS";

// What does it do? ==> reducer
export const playSong = ( song ) => {
  return {
    type: PLAY_SONG,
    song: song,
  };
};

export const pauseSong = ( song ) => {
  return {
    type: PAUSE_SONG,
    song: song,
  };
};

export const setCurrentSong = ( song ) => {
  // debugger
  return {
    type: SET_CURRENT_SONG,
    currentSong: song,
  };
};

export const setElapsedTo = ( time ) => {
  // debugger
  return {
    type: SET_ELAPSED_TO,
    time: time,
  };
};

export const receiveCurrentSongErrors = (errors) => {
  return {
    type: RECEIVE_CURRENT_SONG_ERRORS,
    errors: errors,
  };
};
