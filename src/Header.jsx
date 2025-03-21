import React from "react";

import { useState, useEffect } from "react";
const Header = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(prefersDark);

  console.log(
    "is-dark",
    localStorage.getItem("stardew-fish-route-planner-is-dark-theme")
  );
  console.log("brody", "" || localStorage.getItem("brody"));
  console.log(null || "chicken");

  // if (prefersDark) {
  //   root.setAttribute("color-scheme", "dark");
  // } else {
  //   root.setAttribute("color-scheme", "light");
  // }

  // localStorage.setItem("myCat", "Tom");

  // check if stored in local storage
  // if null use system preference
  // else use local storage

  // each button press toggle value in local storage
  // if system preference changes overwrite local storage

  // root.setAttribute("color-scheme", "dark");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    // setIsDark(mq.matches);
    // console.log("inside useEffect", isDark);
    console.log("WE LIKE IT DARK:", isDark);
    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener("change", (evt) => {
      setIsDark(evt.matches);
      console.log("current mq event value", evt.matches);
      if (!evt.matches) {
        root.setAttribute("color-scheme", "light");
      } else {
        root.setAttribute("color-scheme", "dark");
      }
    });
  }, [isDark]);

  const isDarkTheme = localStorage.getItem("isDarkTheme") === "true";
  if (isDarkTheme) {
    document.body.classList.add();
  } else {
    document.body.classList.remove("stardew-fish-route-planner-dark-theme");
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
      <button style={{ background: "transparent", border: "none" }}>
        <svg
          onClick={() => {
            if (isDark) {
              root.setAttribute("color-scheme", "light");
            } else {
              root.setAttribute("color-scheme", "dark");
            }
            setIsDark(!isDark);
            console.log("toggling inside onClick", !isDark);
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="light-theme-toggle"
        >
          {/* <!-- Center circle (sun body) --> */}
          <circle
            cx="256"
            cy="256"
            r="80"
            stroke="black"
            strokeWidth="30"
            fill="none"
          />

          {/* <!-- Vertical rays --> */}
          <rect x="236" y="40" width="40" height="80" rx="20" ry="20" />
          <rect x="236" y="392" width="40" height="80" rx="20" ry="20" />

          {/* <!-- Horizontal rays --> */}
          <rect x="40" y="236" width="80" height="40" rx="20" ry="20" />
          <rect x="392" y="236" width="80" height="40" rx="20" ry="20" />

          {/* <!-- Diagonal rays --> */}
          {/* <!-- Top right ray --> */}
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(45 256 256)"
          />
          {/* <!-- Bottom right ray --> */}
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(135 256 256)"
          />
          {/* <!-- Bottom left ray --> */}
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(225 256 256)"
          />
          {/* <!-- Top left ray --> */}
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(315 256 256)"
          />
        </svg>
      </button>
    </div>
  );
};

export default Header;
