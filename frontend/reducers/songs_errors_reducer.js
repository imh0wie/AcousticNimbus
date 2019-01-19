import { RECEIVE_SONG, RECEIVE_SONGS, RECEIVE_SONG_ERRORS, RECEIVE_SONGS_ERRORS } from "../actions/song_actions";
import { merge } from "lodash";

const songsErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
      return [];
    case RECEIVE_SONG_ERRORS:
      return merge([], state, action.errors);
    case RECEIVE_SONGS_ERRORS:
      return merge([], state, action.errors);
    default:
      return state;
  }
};

export default songsErrorsReducer;
