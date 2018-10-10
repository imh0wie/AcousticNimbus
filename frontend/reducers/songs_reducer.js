import { RECEIVE_SONG, RECEIVE_SONGS } from "../actions/song_actions";
import { merge } from "lodash";
const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SONG:
    debugger
      return merge({}, state, { [action.song.id]: action.song });
    case RECEIVE_SONGS:
      debugger
      return merge({}, action.songs);
    default:
      return state;
  }
};

export default songsReducer;
