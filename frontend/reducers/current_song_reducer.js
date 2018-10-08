import { PLAY_SONG, PAUSE_SONG, SET_CURRENT_SONG, SET_ELAPSED_TO } from "../actions/current_song_actions";
import { merge } from "lodash";

const defaultState = {
  song: null,
  playing: null,
  elapsed: null,
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
        elapsed: 0,
      }
      debugger
      return merge({}, state, newState);
    case PAUSE_SONG:
      // newState = action.song;
      newState = {
        song: state.song,
        playing: false,
        elapsed: state.elapsed,
      }
      return merge({}, state, newState);
    case PLAY_SONG:
      debugger
      // newState = action.song;
      newState = {
        song: state.song,
        playing: true,
        elapsed: state.elapsed,
      }
      debugger
      return merge({}, state, newState);
    case SET_ELAPSED_TO:
      newState = {
        song: state.song,
        playing: state.playing,
        elapsed: action.time,
      }
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default currentSongReducer;
