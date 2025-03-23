import React from "react";
import { useState, useEffect } from "react";

const Header = () => {
  const root = document.documentElement;

  // Theme initialization - using useEffect to avoid hydration issues
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Get system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Get saved preference from localStorage (if exists)
    const savedTheme = localStorage.getItem(
      "stardew-fish-route-planner-is-dark-theme"
    );

    // Determine initial theme
    let initialIsDark;
    if (savedTheme === null) {
      // No saved preference, use system preference
      initialIsDark = prefersDark;
    } else {
      // Use saved preference
      initialIsDark = savedTheme === "true";
    }

    // Set initial state
    setIsDark(initialIsDark);

    // Apply theme
    root.setAttribute("color-scheme", initialIsDark ? "dark" : "light");

    // Add listener for system preference changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (evt) => {
      // Only update if there's no saved preference
      if (
        localStorage.getItem("stardew-fish-route-planner-is-dark-theme") ===
        null
      ) {
        setIsDark(evt.matches);
        root.setAttribute("color-scheme", evt.matches ? "dark" : "light");
      }
    };

    mq.addEventListener("change", handleChange);

    // Clean up listener
    return () => {
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Update DOM
    root.setAttribute("color-scheme", newIsDark ? "dark" : "light");

    // Save to localStorage
    localStorage.setItem(
      "stardew-fish-route-planner-is-dark-theme",
      String(newIsDark)
    );
  };

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
      <button style={{ background: "transparent", border: "none" }}>
        <svg
          onClick={toggleTheme}
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
