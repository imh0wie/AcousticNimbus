import React from 'react';
import { withRouter } from "react-router-dom";
import { merge } from "lodash";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.submitAction(user).then(this.props.closeModal);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  demoLogin() {
    const dummyUser = { username: "howiechan", password: "88888888" };
    this.props.login(dummyUser);
  }

  // update(field) {
  //   return (e => {
  //     return (
  //       this.setState(
  //         { [field]: e.currentTarget.value }
  //       );
  //     );
  //   });
  formHeader() {
    if (this.props.formType === "signup") {
      return (
        <div className="form-header">
          <h2 className="form-welcome-message">Welcome to Acoustic Nimbus!</h2>
          <br/>
          <h3 className="form-action">Sign Up</h3>
        </div>
      );
    } else {
      return (
        <div className="form-header">
          <h2 className="form-welcome-message">Welcome back to your Nimbus!</h2>
          <br/>
          <h3 className="form-action">Sign In</h3>
        </div>
      );
    }
  };

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map( (error, i) => {
          return (
            <li key={`error${i}}`}>{error}</li>
          );
        })}
      </ul>
    )
  }

  submit() {
    if (this.props.formType === "signup")
    return "Sign Up";
    else {
      return "Log In";
    }
  }

  render() {
    // const submitAction = () => {
    //   if (this.props.formType === "signup")
    //     return {this.props.signup};
    //   else {
    //     return {this.props.login};
    //   }
    // }

    // <form onSubmit={this.handleSubmit.bind(this)} className="">
    return(
      <form onSubmit={this.handleSubmit.bind(this)} className="user-form-container">
        <p onClick={this.props.closeModal} className="form-close">x</p>
        <div className="user-form">
          { this.formHeader() }
          <br/>
            {this.renderErrors()}
            <label>Username
              <input type="text"
                     value={this.state.username}
                     onChange={this.update('username')}
                     className="form-data" />
            </label>
            <br/>
            <label>Password
              <input type="password"
                     value={this.state.password}
                     onChange={this.update('password')}
                     className="form-data" />
            </label>
            <br/>
            <div className="form-buttons-container">
              <input type="submit" value={this.submit()} className="form-submit-button"/>  or  {this.props.switchForm}
            </div>
          <br/>
          <button onClick={this.demoLogin.bind(this)} className="demo-login-button">Demo Login</button>
        </div>
      </form>
    );
    // </form>
  }
}

export default withRouter(SessionForm);
