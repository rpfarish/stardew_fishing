import React from "react";

const Header = () => {
  return (
    <div className="header-div">
      <div
        style={{
          margin: " 20px 15px",
          marginLeft: "4em",
          fontSize: "0.8rem",
          textAlign: "left",
          width: "fit-content",
        }}
      >
        <h1 className="title">
          <a className="title-link" href="/">
            Stardew Fishing Route Planner
          </a>
        </h1>
      </div>
      <div className="topnav"></div>

      {/* <i
        className="fa-solid fa-bars menu fa-2x"
        onClick={() => {
          // console.log("pressing menu");
          //   setMenuSlideout("0");
        }}
      ></i> */}
    </div>
  );
};

export default Header;
