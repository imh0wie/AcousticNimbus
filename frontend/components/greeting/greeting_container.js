import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import Greeting from "./greeting";

// Already have access to state because:
// in the entry file, we passed store to root, AND;
// in the root file, all containers would be wrapped
// in the provider, which passed store to this file

// In this container, we want to give what Greeting wants, which would be:
// 1. currentUser <-- state.entities.users[state.session.id] <-- session.id, AND;
// 2. logout

const msp = ( { session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(msp, mdp)(Greeting);
