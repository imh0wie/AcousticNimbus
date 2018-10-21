import { RECEIVE_LIKES } from "../actions/like_actions";
import { merge } from "lodash";
const likesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LIKES:
      return merge({}, action.likes);
    default:
      return state;
  }
};

export default likesReducer;
