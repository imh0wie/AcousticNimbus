import React from "react";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.submitAction(user).then(this.props.closeModal);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  demoLogin() {
    const dummyUser = { username: "h0wiechan", password: "12345678" };
    this.props.demoLogin(dummyUser).then(this.props.closeModal);
    // ((dummyUser => dispatch(login(dummyUser))).then(this.props.closeModal);
  }

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
          <h2 className="form-welcome-message">Welcome back!</h2>
          <br/>
          <h3 className="form-action">Sign In</h3>
        </div>
      );
    }
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map( (error, i) => {
          return (
            <li key={`error${i}}`}>{error}</li>
          );
        })}
      </ul>
    );
  }

  submit() {
    if (this.props.formType === "signup")
      return (
        <input type="submit" value="Sign Up" className="form-signup-button"/>
      );
    else {
      return (
        <input type="submit" value="Log In" className="form-login-button"/>
      );
    }
  }

  render() {
    return(
      <div className="user-form-container">
        <form onSubmit={this.handleSubmit.bind(this)} className="user-form">
          <p onClick={this.props.closeModal} className="form-close">x</p>
          { this.formHeader() }
          <br/>
          {this.renderErrors()}
          <div className="username-input">
            <label>Username
              <input type="text"
                     value={this.state.username}
                     onChange={this.update("username")}
                     className="form-data" />
            </label>
          </div>
          <br/>
          <div className="password-input">
            <label>Password
              <input type="password"
                     value={this.state.password}
                     onChange={this.update("password")}
                     className="form-data" />
            </label>
          </div>
          <div className="form-buttons-container">
            {this.submit()}<p className="button-separator">or</p>{this.props.switchForm}
          </div>
          <br/>
          <br/>
          <div className="demo-login-container">
            <button onClick={this.demoLogin.bind(this)} className="demo-login-button">DEMO LOGIN</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
