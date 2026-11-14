import React from "react";

import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Link id="getButton" to="/reservation">
        Welcome to Orbs! Click here to get started.
      </Link>
    </div>
  );
}

export default Landing;
