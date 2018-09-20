import { PLAY_SONG, PAUSE_SONG, SET_CURRENT_SONG } from "../actions/current_song_actions";
import { merge } from "lodash";

const defaultState = {
  song: {
    id: null,
    title: null,
    genre: null,
    audio_url: null,
    image_url: null,
    artist: null,
  },
  playing: false,
};

const currentSongReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case PLAY_SONG:
      newState = {
        song: action.song,
        playing: true,
      };
      return merge({}, state, newState);
    case PAUSE_SONG:
      newState = {
        song: action.song,
        playing: false,
      };
      return merge({}, state, newState);
    case SET_CURRENT_SONG:
      newState = {
        song: action.song,
        playing: false,
      };
      return merge({}, state, newState);
    default:
      return state;
  }
};

export default currentSongReducer;
