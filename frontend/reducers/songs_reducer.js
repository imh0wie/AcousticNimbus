import { RECEIVE_SONG, RECEIVE_SONGS } from "../actions/song_actions";
import { merge } from "lodash";
const songsReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_SONG:
      newState = { [action.song.id]: action.song }
      return merge({}, state, newState);
    case RECEIVE_SONGS:
      newState = action.songs;
      return merge({}, newState);
    default:
      return state;
  }
};

export default songsReducer;
