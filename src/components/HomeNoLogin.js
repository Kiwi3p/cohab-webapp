import React from "react";
import { Link } from "react-router-dom";

class HomeNoLogin extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Link to={`/login`}>Login</Link>
        <Link to={`/signup`}>SignUp</Link>
      </div>
    );
  }
}
export default HomeNoLogin;
