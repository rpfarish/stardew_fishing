import "./App.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import GridLayout from "./GridLayout";
import Footer from "./Footer";
import Interface from "./Interface";
import stardewFish from "./stardewFish";

// Define a consistent localStorage key to use across components
const THEME_STORAGE_KEY = "stardew-fish-route-planner-theme";

function App() {
  const selectedMap = new Map(stardewFish.map((fish) => [fish, true]));
  const [isSelectedMapState, setIsSelectedMapState] = useState(selectedMap);

  // Initialize theme state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Apply theme to document when it changes
  useEffect(() => {
    if (!theme) return; // Ensure theme is defined

    // Apply theme to root element
    document.documentElement.setAttribute("color-scheme", theme);

    // Save to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Toggle function to pass to Header
  const toggleTheme = () => {
    document.documentElement.classList.add("theme-changing"); // Disable transitions

    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    document.documentElement.style.backgroundColor =
      prevTheme === "dark" ? "#101218" : "#ffffff";
    setTimeout(() => {
      document.documentElement.classList.remove("theme-changing"); // Restore transitions
    }, 100); // Adjust delay if needed
  };

  return (
    <>
      <Header currentTheme={theme} toggleTheme={toggleTheme} />
      <Interface
        selectedState={{ isSelectedMapState, setIsSelectedMapState }}
      />
      <GridLayout
        selectedState={{ isSelectedMapState, setIsSelectedMapState }}
      />
      <Footer />
    </>
  );
}

export default App;
