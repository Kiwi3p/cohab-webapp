import React from "react";
import { useLottie } from "lottie-react";
import CoHabAnimation from "./animation/data.json";
import { Link } from "react-router-dom";

export default function Home() {
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
      <div className="enter">
          <Link className="enter-link" to={`/house/user-tasks`}>ENTER</Link>
      </div>
    </div>
  );
}
