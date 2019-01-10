import { RECEIVE_SONG, RECEIVE_SONGS, RECEIVE_FOLLOWED_SONGS, RECEIVE_LIKED_SONGS, RECEIVE_FOLLOWED_AND_LIKED_SONGS, EMPTY_INDIVIDUAL_SONG, EMPTY_RELATED_SONGS_BY_GENRE, EMPTY_SONGS_OF_SPECIFIC_USER, EMPTY_LIKED_SONGS_OF_SPECIFIC_USER, EMPTY_FOLLOWED_SONGS, EMPTY_LIKED_SONGS, EMPTY_FOLLOWED_AND_LIKED_SONGS_OF } from "../actions/song_actions";
import { merge } from "lodash";

const songsReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_SONG:
      newState = merge({}, action.song);
      return merge({}, state, newState);
    case RECEIVE_SONGS:
    case RECEIVE_FOLLOWED_SONGS:
    case RECEIVE_LIKED_SONGS:
    case RECEIVE_FOLLOWED_AND_LIKED_SONGS:
      newState = action.songs;
      return merge({}, state, newState);
    case EMPTY_INDIVIDUAL_SONG:
    case EMPTY_RELATED_SONGS_BY_GENRE:
    case EMPTY_SONGS_OF_SPECIFIC_USER:
    case EMPTY_LIKED_SONGS_OF_SPECIFIC_USER:
    case EMPTY_FOLLOWED_SONGS:
    case EMPTY_LIKED_SONGS:
    case EMPTY_FOLLOWED_AND_LIKED_SONGS_OF:
      newState = action.defaultState;
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
