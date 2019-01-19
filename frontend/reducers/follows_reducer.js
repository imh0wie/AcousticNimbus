import { RECEIVE_FOLLOWS } from "../actions/follow_actions";
import { merge } from "lodash";

const followsReducer = (state = null, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_FOLLOWS:
      newState = merge({}, action.follows);
      return newState;
    default:
      return state;
  }
};

export default followsReducer;
