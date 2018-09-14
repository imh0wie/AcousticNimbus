import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal_actions";
import { merge } from "lodash";

const modalReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      const newModal = {
        modal: action.modal
      }
      // debugger
      return merge({}, state, newModal);
    case CLOSE_MODAL:
      // debugger
      return null;
    default:
    // debugger
      return state;
  }
}

export default modalReducer;
