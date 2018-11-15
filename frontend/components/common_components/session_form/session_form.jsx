import React from "react";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
    // e.preventDefault();
    // let password = '123456';
    // this.state = {
    //   username: '',
    //   password: ''
    // }
    // const login = () => {
    //   setTimeout(() => {
    //     if (password.length > 0) {
    //       this.setState({
    //         username:"h0wiechan",
    //         password: this.state.password.concat(password[0])
    //       });
    //       password = password.slice(1);
    //       newdemo();
    //     }
    //     else {
    //       dispatch(login(this.state))
    //       .then(this.props.closeModal);
    //     }
    //   }, 100);
    // }
    // newdemo();
    
    // const username = "h0wiechan".split();
    // const password = "12345678".split();
    // for (let i = 0; i < username.length; i++) {
    //   const char = username[i];
    //   this.setState({username: this.state.username + char})
    //   // if (char === "o") {
    //   //   this.setState({username: this.state.username - char});
    //   //   this.setState({username: this.state.username + "0"});
    //   // }
    // }
    // for (let j = 0; j < password.length; j++) {
    //   const char = password[j];
    //   this.setState({password: this.state.password + char})
    // }
    
    this.props.demoLogin(dummyUser).then(this.props.closeModal);
    // (dummyUser => dispatch(login(dummyUser)).then(this.props.closeModal);
  }

  formHeader() {
    if (this.props.formType === "signup") {
      return (
        <div className="header">
          <img src={window.altLogo}></img>
          {/* <h2 className="form-welcome-message">Welcome to Acoustic Nimbus!</h2> */}
          <br/>
          <h3>Join us now!</h3>
        </div>
      );
    } else {
      return (
        <div className="header">
          <img src={window.altLogo}></img>
          {/* <h2 className="form-welcome-message">Welcome back!</h2> */}
          <br/>
          <h3>SIGN IN</h3>
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
          <span onClick={this.props.closeModal}><i className="fas fa-times"></i></span>
          { this.formHeader() }
          <br/>
          {this.renderErrors()}
          <div className="input">
            <p>Username</p>
            <input type="text"
                    value={this.state.username}
                    onChange={this.update("username")}
                    className="data" />
          </div>
          <br/>
          <div className="input">
            <p>Password</p>
            <input type="password"
                    value={this.state.password}
                    onChange={this.update("password")}
                    className="data" />
          </div>
          <div className="buttons">
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
