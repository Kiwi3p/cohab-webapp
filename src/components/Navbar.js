import React from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../utils/auth";
class Navbar extends React.Component {
  logoutUser = () => {
    const authService = new AuthService();
    authService.logout().then(() => {
      this.props.setCurrentUser(null);
      localStorage.removeItem("loggedInUser");
    });
  };

    navFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  render() {
    if (this.props.loggedInUser) {
      return (
        <div>
          <nav className="nav-btn">
            <div>
            <div className="icon">
              <button onClick={this.navFunction} className="plans"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-circle plus-button" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg></button>
            </div>
            <div class="nav-link-color" id="myLinks" style={{display: "none"}}>
            <p>Welcome {this.props.loggedInUser.username}</p>
            <ul className="topNav">
              <li className="nav-link-color">
                <NavLink to="/">
                  <button onClick={this.logoutUser}>Logout</button>
                </NavLink>
              </li>
              <li className="nav-link-color">
                <NavLink activeStyle={{ color: "red" }} exact to="/">
                  Homepage
                </NavLink>
              </li>
              <li className="nav-link-color">
                <NavLink activeStyle={{ color: "red" }} exact to="/house">
                  List Houses
                </NavLink>
              </li>
              <li className="nav-link-color">
                <NavLink activeStyle={{ color: "red" }} exact to="/house/add">
                  Add House
                </NavLink>
              </li>
              <li className="nav-link-color">
                <NavLink activeStyle={{ color: "red" }} exact to="/house/users">
                  list users
                </NavLink>
              </li>
              <li className="nav-link-color">
                <NavLink activeStyle={{ color: "red" }} exact to="/house/user-house">
                  Add a Task
                </NavLink>
              </li>
              <li className="nav-link-color">
                <NavLink activeStyle={{ color: "red" }} exact to="/house/user-tasks">
                  Your day
                </NavLink>
              </li>
            </ul>
            </div>
            
            </div>  
          </nav>
        </div>
      );
    } else {
      return (
        <></>
      );
    }
  }
}
export default Navbar;
