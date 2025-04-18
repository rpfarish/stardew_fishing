import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import "./Header.css";

const Header = ({ currentTheme, toggleTheme }) => {
  const isDark = currentTheme === "dark";

  return (
    <div className="header-div">
      <div className="inner-header-div">
        <h1 className="title">
          <a className="title-link" href="/">
            Stardew Fishing Route Planner
          </a>
        </h1>
      </div>
      <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Header;
