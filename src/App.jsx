import "./App.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import RemainingFish from "./RemainingFish";
import Footer from "./Footer";
import Interface from "./Interface";
import stardewFish from "./stardewFish";

const THEME_STORAGE_KEY = "stardew-fish-route-planner-theme";

function App() {
  console.log("app reloaded");
  const [saveFileLoaded, setSaveFileLoaded] = useState(false);
  const [saveFileData, setSaveFileData] = useState({});
  const isCaughtMap = new Map(stardewFish.map((fish) => [fish, true]));
  const [isCaughtMapState, setIsCaughtMapState] = useState(isCaughtMap);

  console.log(isCaughtMap);

  console.log(saveFileLoaded, saveFileData);

  const handleFileLoad = (fishData) => {
    setSaveFileData(fishData);
    setSaveFileLoaded(true);
    // Update caught status based on fish data
    setIsCaughtMapState(() => {
      // Start with all fish as uncaught (true)
      const newMap = new Map(stardewFish.map((fish) => [fish, true]));
      // Then mark the caught ones as false
      Object.values(fishData).forEach((fish) => {
        if (fish?.name && newMap.has(fish.name)) {
          newMap.set(fish.name, false);
        }
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
