import { PLAY_SONG, PAUSE_SONG, SET_CURRENT_SONG, SET_ELAPSED_TO, MUTE_SONG, UNMUTE_SONG } from "../actions/current_song_actions";
import { merge } from "lodash";

const defaultState = {
  song: null,
  playing: null,
  elapsed: null,
  muted: false,
};

const currentSongReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case SET_CURRENT_SONG:
      debugger
      // newState = action.currentSong
      newState = {
        song: action.song,
        playing: false,
        elapsed: 0,
        muted: state.muted,
      }
      debugger
      return merge({}, state, newState);
    case PAUSE_SONG:
      // newState = action.song;
      newState = {
        song: state.song,
        playing: false,
        elapsed: state.elapsed,
        muted: state.muted,
      }
      return merge({}, state, newState);
    case PLAY_SONG:
      debugger
      // newState = action.song;
      newState = {
        song: state.song,
        playing: true,
        elapsed: state.elapsed,
        muted: state.muted,
      }
      debugger
      return merge({}, state, newState);
    case SET_ELAPSED_TO:
      newState = {
        song: state.song,
        playing: state.playing,
        elapsed: action.time,
        muted: state.muted,
      }
      return merge({}, state, newState);
    case MUTE_SONG:
      newState = {
        song: state.song,
        playing: state.playing,
        elapsed: state.elapsed,
        muted: true,
      }
      return merge({}, state, newState);
    case UNMUTE_SONG:
      newState = {
        song: state.song,
        playing: state.playing,
        elapsed: state.elapsed,
        muted: false,
      }
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default currentSongReducer;
