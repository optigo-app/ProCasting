import React from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const GlobalHeader = ({ topLogo, handleClick }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <div
        style={{ display: "flex", justifyContent: "start", alignItems: "center" }}
        onClick={() => navigate("/homeone")}
      >
        <img src={topLogo} alt="Logo" style={{ width: "75px" }} />
        <p
          style={{
            fontSize: "25px",
            opacity: "0.6",
            margin: "0px 10px",
            fontWeight: 500,
          }}
        >
          <span style={{ color: "#00FFFF", opacity: "1" }}>Pro</span>Casting
        </p>
      </div>
      <CgProfile
        style={{ height: "30px", width: "30px", marginRight: "10px" }}
        onClick={handleClick}
      />
    </div>
  );
};

export default GlobalHeader;
