import React from "react";
import { useLottie } from "lottie-react";
import CoHabAnimation from "./animation/data.json";

export default function Home() {
  const options = {
    animationData: CoHabAnimation,
    loop: false,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="lottie-container">
    {View
    }</div>

  );
}
