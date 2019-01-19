export const PLAY_SONG = "PLAY_SONG";
export const PAUSE_SONG = "PAUSE_SONG";
export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_ELAPSED_TO = "SET_ELAPSED_TO";
export const MUTE_SONG = "MUTE_SONG";
export const UNMUTE_SONG = "UNMUTE_SONG";
export const RECEIVE_CURRENT_SONG_ERRORS = "RECEIVE_CURRENT_SONG_ERRORS";

export const playSong = () => {
  return {
    type: PLAY_SONG,
  };
};

export const pauseSong = () => {
  return {
    type: PAUSE_SONG,
  };
};

export const setCurrentSong = ( song ) => {
  return {
    type: SET_CURRENT_SONG,
    song: song,
  };
};

export const setElapsedTo = ( time ) => {
  return {
    type: SET_ELAPSED_TO,
    time: time,
  };
};

export const muteSong = () => {
  return {
    type: MUTE_SONG,
  }
}

export const unmuteSong = () => {
  return {
    type: UNMUTE_SONG,
  }
}

export const receiveCurrentSongErrors = (errors) => {
  return {
    type: RECEIVE_CURRENT_SONG_ERRORS,
    errors: errors,
  };
};
