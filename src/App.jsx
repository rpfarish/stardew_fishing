import "./App.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import RemainingFish from "./RemainingFish";
import Footer from "./Footer";
import Interface from "./Interface";
import stardewFish from "./stardewFish";
import filterFishBySeasons from "./filterFish";
import fishData from "./fish.json";

const THEME_STORAGE_KEY = "stardew-fish-route-planner-theme";

function App() {
  const allSeasons = ["Spring", "Summer", "Fall", "Winter"];
  const isCaughtMap = new Map(stardewFish.map((fish) => [fish, true]));
  const [isCaughtMapState, setIsCaughtMapState] = useState(isCaughtMap);
  const [curStartSeason, setCurStartSeason] = useState("Spring");
  const [curSeason, setCurSeason] = useState("Spring");

  const [allFilteredFishArr, setAllFilteredFishArr] = useState(
    filterFishBySeasons(fishData, allSeasons, curStartSeason),
  );

  const [filteredFish, setFilteredFish] = useState(
    allFilteredFishArr[allSeasons.indexOf(curSeason)],
  );

  const handleFileLoad = (fileFishData, newCurSeason) => {
    setCurSeason(newCurSeason);
    setCurStartSeason(newCurSeason);

    console.log(
      "logging in handleFileLoad",
      fishData,
      allSeasons,
      newCurSeason,
    );
    const newFilteredFish = filterFishBySeasons(
      fishData,
      allSeasons,
      newCurSeason,
    );

    setAllFilteredFishArr(newFilteredFish);
    const index = allSeasons.indexOf(newCurSeason);
    setFilteredFish(newFilteredFish[index]);

    setIsCaughtMapState(() => {
      const newMap = new Map(isCaughtMap);

      Object.values(fileFishData).forEach((fish) => {
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
        curSeason={curSeason}
        setCurSeason={setCurSeason}
        curStartSeason={curStartSeason}
        setCurStartSeason={setCurStartSeason}
        filteredFish={filteredFish}
        setFilteredFish={setFilteredFish}
        allFilteredFishArr={allFilteredFishArr}
        setAllFilteredFishArr={setAllFilteredFishArr}
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
