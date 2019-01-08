import { RECEIVE_SONG, RECEIVE_SONGS, EMPTY_SONGS_OF_SPECIFIC_USER, EMPTY_LIKED_SONGS_OF_SPECIFIC_USER, EMPTY_FOLLOWED_SONGS, EMPTY_LIKED_SONGS } from "../actions/song_actions";
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
      return merge({}, state, newState);
    case EMPTY_SONGS_OF_SPECIFIC_USER:
    case EMPTY_LIKED_SONGS_OF_SPECIFIC_USER:
    case EMPTY_FOLLOWED_SONGS:
    case EMPTY_LIKED_SONGS:
      newState = action.defaultState;
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
