import React from "react";
import { Link } from "react-router-dom";
import orbLanding from "../../assets/orb-landing.png";

function Landing() {
  return (
    <div className="landing">
      <Link id="getButton" to="/reservation">
        <img src={orbLanding} alt="ORBS - Reserve an office room" />
      </Link>
    </div>
  );
}

export default Landing;
