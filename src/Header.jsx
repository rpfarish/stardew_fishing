import React from "react";
import "./Header.css";

// Updated Header to receive theme props from App
const Header = ({ currentTheme, toggleTheme }) => {
  // Determine if current theme is dark
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
      <div className="topnav"></div>
      <button
        className="theme-toggle-button"
        onClick={toggleTheme}
        // style={{ background: "transparent", border: "none" }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="light-theme-toggle"
        >
          {/* Center circle (sun body) */}
          <circle
            cx="256"
            cy="256"
            r="80"
            stroke="currentColor"
            strokeWidth="30"
            fill="none"
          />

          {/* Vertical rays */}
          <rect x="236" y="40" width="40" height="80" rx="20" ry="20" />
          <rect x="236" y="392" width="40" height="80" rx="20" ry="20" />

          {/* Horizontal rays */}
          <rect x="40" y="236" width="80" height="40" rx="20" ry="20" />
          <rect x="392" y="236" width="80" height="40" rx="20" ry="20" />

          {/* Diagonal rays */}
          {/* Top right ray */}
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(45 256 256)"
          />
          {/* Bottom right ray */}
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(135 256 256)"
          />
          {/* Bottom left ray */}
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(225 256 256)"
          />
          {/* Top left ray */}
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
