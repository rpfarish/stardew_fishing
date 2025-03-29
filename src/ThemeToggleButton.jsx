import React from "react";
import "./ThemeToggleButton.css";

const ThemeToggleButton = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="toggle-icons-container">
        {/* Updated Sun icon with better centering */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={`toggle-icon sun-icon ${isDark ? "" : "hidden"}`}
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
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(45 256 256)"
          />
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(135 256 256)"
          />
          <rect
            x="236"
            y="26"
            width="40"
            height="80"
            rx="20"
            ry="20"
            transform="rotate(225 256 256)"
          />
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

        {/* Updated Moon icon with better centering */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`toggle-icon moon-icon ${isDark ? "hidden" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>

        {/* Circle overlay for the sliding effect */}
        <div className={`toggle-circle ${isDark ? "dark" : "light"}`}></div>
      </div>
    </button>
  );
};

export default ThemeToggleButton;
