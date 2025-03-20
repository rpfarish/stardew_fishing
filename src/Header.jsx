import React from "react";
import { useState, useEffect } from "react";
const Header = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(prefersDark);

  /* window.matchMedia('(prefers-color-scheme: dark)').matches */

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    setIsDark(mq.matches);

    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener("change", (evt) => setIsDark(evt.matches));
  }, [isDark]);

  const isDarkTheme = localStorage.getItem("isDarkTheme") === "true";
  if (isDarkTheme) {
    document.body.classList.add("gf-dark-theme");
  } else {
    document.body.classList.remove("gf-dark-theme");
  }

  return (
    <div className="header-div">
      <div className="inner-header-div">
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
      {/* <button
        onClick={() => {
          setIsDark(!isDark);
        }}
      ></button> */}
    </div>
  );
};

export default Header;
