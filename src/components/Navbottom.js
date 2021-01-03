import React from "react";
import { NavLink } from "react-router-dom";
//import AuthService from "../utils/auth";
class Navbottom extends React.Component {

  render() {

      return (
        <div>
          <nav className="nav-btm">
            <ul className="btm-links">
              <li className="home-btn">
                <NavLink exact to="/">
                  <img src="/img/home.svg" alt="home"/>
                </NavLink>
              </li>
              <li className="bottom-link">
                <NavLink exact to="/house">
                <img src="/img/other-tasks.svg" alt="Other Tasks"/>
                </NavLink>
              </li>
              <li className="bottom-link">
                <NavLink exact to="/house/user-tasks">
                <img src="/img/add-task.svg" alt="add task"/>
                </NavLink>
              </li>
              <li className="bottom-link">
                <NavLink exact to="/house/success">
                <img src="/img/rewards.svg" alt="reward"/>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      );
  }
}
export default Navbottom;
