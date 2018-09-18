import { connect } from "react-redux";
import { login, logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";
import BarButtons from "./header_bar_buttons";

// Already have access to state because:
// in the entry file, we passed store to root, AND;
// in the root file, all containers would be wrapped
// in the provider, which passed store to this file

// In this container, we want to give what Greeting wants, which would be:
// 1. currentUser <-- state.entities.users[state.session.id] <-- session.id, AND;
// 2. logout

const msp = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(msp, mdp)(BarButtons);
