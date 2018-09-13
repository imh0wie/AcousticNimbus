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
    this.props.submitAction(user);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // update(field) {
  //   return (e => {
  //     return (
  //       this.setState(
  //         { [field]: e.currentTarget.value }
  //       );
  //     );
  //   });
  // }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map( (error) => {
          return (
            <li>{error}</li>
          );
        })}
      </ul>
    )
  }

  render() {
    const formHeader = () => {
      if (this.props.formType === "signup")
        return (
          <h2>Welcome to Acoustic Nimbus</h2>
        );
      else {
        return (
          <h2>Welcome back, my friend!</h2>
        );
      }
    }
    // const submitAction = () => {
    //   if (this.props.formType === "signup")
    //     return {this.props.signup};
    //   else {
    //     return {this.props.login};
    //   }
    // }

    return(
      <div>
        { formHeader() }
        <br/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.renderErrors()}
          <label>Username
            <input type="text" value={this.state.username} onChange={this.update('username')} />
          </label>
          <br/>
          <label>Password
            <input type="text" value={this.state.password} onChange={this.update('password')} />
          </label>
          <br/>
          <input type="submit" value={this.props.formType} /> or {this.props.switchLink}
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
