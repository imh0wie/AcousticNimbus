import { RECEIVE_EXTRA_LIKES, RECEIVE_LESS_LIKES, EMPTY_LIKES } from "../actions/like_actions";
import { merge } from "lodash";

const likesReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_EXTRA_LIKES:
      newState = merge({}, action.likes);
      return merge({}, state, newState);
    case RECEIVE_LESS_LIKES:
      newState = merge({}, action.likes);
      return merge({}, newState);
    case EMPTY_LIKES:
      newState = null;
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
