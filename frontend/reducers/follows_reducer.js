import { RECEIVE_FOLLOWS } from "../actions/follow_actions";
import { merge } from "lodash";

// const defaultState = {
//   id: null,
//   followedUserId: null,
//   followerId: null,
// };

const followsReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_FOLLOWS:
      newState = merge({}, action.follows);
      return newState;
    // case RECEIVE_PERSONAL_FOLLOWS:
    //   newState = merge({}, action.follows);
    //   return merge({}, state, newState);
    default:
      return state;
  }
};

export default followsReducer;
