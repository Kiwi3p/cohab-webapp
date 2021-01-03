import React from "react";
import AuthService from "../../utils/auth";
import { Link, withRouter } from "react-router-dom";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const authService = new AuthService();
    authService.signup(this.state.username, this.state.password).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="flex-sign">
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            className="input-change"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            className="input-change"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="submit" type="submit"><h2>Signup</h2></button>
        </form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Signup);
