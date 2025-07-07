import "./App.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import RemainingFish from "./RemainingFish";
import Footer from "./Footer";
import Interface from "./Interface";
import stardewFish from "./stardewFish";

const THEME_STORAGE_KEY = "stardew-fish-route-planner-theme";

function App() {
  const isCaughtMap = new Map(stardewFish.map((fish) => [fish, true]));
  const [isCaughtMapState, setIsCaughtMapState] = useState(isCaughtMap);

  const handleFileLoad = (fishData) => {
    setIsCaughtMapState(() => {
      const newMap = new Map(isCaughtMap);

      Object.values(fishData).forEach((fish) => {
        if (fish?.name && newMap.has(fish.name)) newMap.set(fish.name, false);
      });

      return newMap;
    });
  };

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    const systemDefautTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return systemDefautTheme;
  });

  useEffect(() => {
    if (!theme) return;

    document.documentElement.setAttribute("color-scheme", theme);
    document.documentElement.style.backgroundColor =
      theme === "dark" ? "#101218" : "#ffffff";

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    document.documentElement.classList.add("theme-changing");

    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    setTimeout(() => {
      document.documentElement.classList.remove("theme-changing");
    }, 100);
  };

  return (
    <>
      <Header currentTheme={theme} toggleTheme={toggleTheme} />
      <Interface
        isCaughtMapState={isCaughtMapState}
        setIsCaughtMapState={setIsCaughtMapState}
        handleFileLoad={handleFileLoad}
      />
      <RemainingFish
        isCaughtMapState={isCaughtMapState}
        setIsCaughtMapState={setIsCaughtMapState}
      />
      <Footer />
    </>
  );
}

export default App;
