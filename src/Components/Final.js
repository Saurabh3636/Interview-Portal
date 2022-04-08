import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Final() {
  let navigate = useNavigate();
  let location = useLocation();

  const result = location.state;
  const backHome = () => {
    localStorage.setItem("option", []);
    navigate("/");
  };
  return (
    <div>
      <div>
        <h1>Result </h1>
      </div>
      <p>Score : {result === null ? 0 : result}</p>
      <button onClick={backHome}>back to Home</button>
    </div>
  );
}

export default Final;
