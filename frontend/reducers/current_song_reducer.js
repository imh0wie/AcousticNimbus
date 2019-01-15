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
      // newState = action.currentSong
      newState = {
        song: action.song,
        playing: false,
        elapsed: 0,
      }
      return merge({}, state, newState);
    case PAUSE_SONG:
      // newState = action.song;
      newState = {
        playing: false,
      }
      return merge({}, state, newState);
    case PLAY_SONG:
      // newState = action.song;
      newState = {
        playing: true,
      }
      return merge({}, state, newState);
    case SET_ELAPSED_TO:
      newState = {
        elapsed: action.time,
      }
      return merge({}, state, newState);
    case MUTE_SONG:
      newState = {
        muted: true,
      }
      return merge({}, state, newState);
    case UNMUTE_SONG:
      newState = {
        muted: false,
      }
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default currentSongReducer;
