import { RECEIVE_USER, RECEIVE_RANDOM_THREE_USERS, EMPTY_FOLLOWERS_OF_SPECIFIC_USER, RECEIVE_LIKERS_OF_SPECIFIC_SONG, RECEIVE_FOLLOWERS_OF_SPECIFIC_USER, EMPTY_RANDOM_THREE_USERS, EMPTY_INDIVIDUAL_USER, EMPTY_LIKERS_OF_SPECIFIC_SONG } from "../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_USER:
    case RECEIVE_RANDOM_THREE_USERS:
    case RECEIVE_LIKERS_OF_SPECIFIC_SONG:
    case RECEIVE_FOLLOWERS_OF_SPECIFIC_USER:
      newState = merge({}, state, action.users || action.user);
      return newState;
    case EMPTY_INDIVIDUAL_USER:
    case EMPTY_RANDOM_THREE_USERS:
    case EMPTY_LIKERS_OF_SPECIFIC_SONG:
    case EMPTY_FOLLOWERS_OF_SPECIFIC_USER:
      newState = merge({}, action.defaultState);
      return newState;
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});
    default:
      return state;
  }
};

export default usersReducer;
