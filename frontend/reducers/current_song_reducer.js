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
    case SET_CURRENT_SONG:
      debugger
      // newState = action.currentSong
      newState = {
        song: action.currentSong,
        playing: false,
        pos: 0,
      }
      debugger
      return merge({}, state, newState);
    case PAUSE_SONG:
      // newState = action.song;
      newState = {
        song: state.song,
        playing: false,
        pos: 0,
      }
      return merge({}, state, newState);
    case PLAY_SONG:
      debugger
      // newState = action.song;
      newState = {
        song: state.song,
        playing: true,
        pos: 0,
      }
      debugger
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default currentSongReducer;
