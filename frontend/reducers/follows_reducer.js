import { RECEIVE_FOLLOWS } from "../actions/follow_actions";
import { merge } from "lodash";

// const defaultState = {
//   id: null,
//   followedUserId: null,
//   followerId: null,
// };

const followsReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FOLLOWS:
      return merge({}, action.follows);
    default:
      return state;
  }
};

export default followsReducer;
