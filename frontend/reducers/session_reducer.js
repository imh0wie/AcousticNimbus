import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { merge } from "lodash";

const noUserState = { id: null };
// const defaultState = Object.freeze({id: null});

const sessionReducer = (state = {}, action) => {
  Object.freeze(state);
  debugger
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    debugger
      return merge( {}, state, { id: action.currentUser.id } );
    case LOGOUT_CURRENT_USER:
      return merge( {}, state, noUserState );
    default:
      return state;
  }
};

export default sessionReducer;
