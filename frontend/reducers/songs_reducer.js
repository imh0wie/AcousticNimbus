import { RECEIVE_SONG, RECEIVE_SONGS, EMPTY_FOLLOWED_SONGS } from "../actions/song_actions";
import { merge } from "lodash";
const songsReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_SONG:
      newState = merge({}, { [action.song.id]: action.song })
      return merge({}, state, newState);
    case RECEIVE_SONGS:
      newState = action.songs;
      return merge({}, newState);
    case EMPTY_FOLLOWED_SONGS:
      return null;
    default:
      return state;
  }
};

export default songsReducer;
