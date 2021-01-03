import React from "react";
import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import CoHabAnimation from "./animation/data.json";



export default function HomeNoLogin() {
  const options = {
    animationData: CoHabAnimation,
    loop: false,
    autoplay: true,
  };

  const { View } = useLottie(options);

    return (
      <div>
      <h1 className="manage">Manage your home!</h1>
      <div className="lottie-container">
        {View}
      </div>
      <nav className="log-sign">
          <ul>
            <li>
              <Link className="login" activeStyle={{ color: "red" }} exact to="/login">
                <h1>Login</h1>
              </Link>
            </li>
            <li>
              <Link className="signup" activeStyle={{ color: "red" }} exact to="/signup">
                <h1>Signup</h1>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  
}

