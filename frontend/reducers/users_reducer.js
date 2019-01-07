import { RECEIVE_RANDOM_THREE_USERS, EMPTY_RANDOM_THREE_USERS, EMPTY_INDIVIDUAL_USER, RECEIVE_USER } from "../actions/user_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_USER:
    case RECEIVE_RANDOM_THREE_USERS:
      newState = merge({}, state, action.users || action.user);
      return newState;
    case EMPTY_INDIVIDUAL_USER:
    case EMPTY_RANDOM_THREE_USERS:
      newState = merge({}, action.defaultState);
      return newState;
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});
    default:
      return state;
  }
};

export default usersReducer;
