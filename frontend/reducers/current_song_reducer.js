import { PLAY_SONG, PAUSE_SONG, SET_CURRENT_SONG } from "../actions/current_song_actions";
import { merge } from "lodash";

const defaultState = {
  song: null,
  playing: null,
  pos: null,
};

const currentSongReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case PLAY_SONG:
      newState = {
        song: action.currentSong,
        playing: false,
        pos: 0,
      };
      return merge({}, state, newState);
    case PAUSE_SONG:
      newState = {
        song: action.currentSong,
        playing: false,
        pos: 0,
      };
      return merge({}, state, newState);
    case SET_CURRENT_SONG:
      newState = {
        song: action.currentSong,
        playing: false,
        pos: 0,
      };
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default currentSongReducer;
