import { useState } from "react";
import filterFishBySeasons from "./filterFish";

import fishData from "./fish.json";
import stardewFish from "./stardewFish";
import allCCFish from "./AllCCFish";
import sortedFishMetric from "./SortedFishMetric";

import FishLocations from "./FishLocations";
import SeasonInfo from "./SeasonInfo";
import "./Interface.css";

const Interface = ({ isCaughtMapState, setIsCaughtMapState }) => {
  const [count, setCount] = useState(0);
  const [startCount, setStartCount] = useState(0);
  const [curStartSeason, setCurStartSeason] = useState("Spring");
  const [curSeason, setCurSeason] = useState("Spring");
  const allSeasons = ["Spring", "Summer", "Fall", "Winter"];
  const [showResults, setShowResults] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fishInfoShown, setFishInfoShown] = useState(new Set());

  const [allFilteredFishArr, setAllFilteredFishArr] = useState(
    filterFishBySeasons(fishData, allSeasons, curStartSeason)
  );

  const [filteredFish, setFilteredFish] = useState(
    allFilteredFishArr[startCount]
  );

  let displayableFish = filteredFish.filter((fish) =>
    isCaughtMapState.get(fish.Name)
  );

  const selectAll = () => {
    const caughtMap = new Map();
    for (let i = 0; i < stardewFish.length; i++)
      caughtMap.set(stardewFish[i], true);

    setIsCaughtMapState(caughtMap);
  };

  const selectAllCC = () => {
    let caughtMap = new Map(stardewFish.map((fish) => [fish, false]));
    stardewFish.forEach((fish) => {
      caughtMap.set(fish, allCCFish.has(fish));
    });

    setIsCaughtMapState(caughtMap);
  };

  const clearAll = () => {
    const caughtMap = new Map(stardewFish.map((fish) => [fish, false]));
    setIsCaughtMapState(caughtMap);
  };

  const setStartingSeason = () => {
    setStartCount(count);
    setCurStartSeason(allSeasons[count]);
    const newFilteredFish = filterFishBySeasons(
      fishData,
      allSeasons,
      allSeasons[count]
    );

    setAllFilteredFishArr(newFilteredFish);
    setFilteredFish(newFilteredFish[count]);
  };

  const prevSeason = () => {
    const newCount = (count - 1 + 4) % 4;
    setCount(newCount);
    setCurSeason(allSeasons[newCount]);
    setFilteredFish(allFilteredFishArr[newCount]);
  };

  const nextSeason = () => {
    const newCount = (count + 1) % 4;
    setCount(newCount);
    setCurSeason(allSeasons[newCount]);
    setFilteredFish(allFilteredFishArr[newCount]);
  };

  const toggleSeasonInfo = () => {
    setShowInfo(!showInfo);
    if (showInfo) {
      setFishInfoShown(new Set()); // Hide all
    } else {
      setFishInfoShown(new Set(stardewFish)); // Show all
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
    setIsExpanded(!isExpanded);
  };

  function createLocationMap(filteredFish) {
    const locationRank = new Map();
    const fishByLocation = new Map();

    sortedFishMetric.forEach((loc, index) => {
      locationRank.set(loc, index);
    });

    filteredFish.forEach((fish) => {
      const primaryLocation = sortedFishMetric.find((loc) =>
        fish.Location.includes(loc)
      );

      if (primaryLocation) {
        if (!fishByLocation.has(primaryLocation)) {
          fishByLocation.set(primaryLocation, []);
        }
        fishByLocation.get(primaryLocation).push(fish);
      }
    });

    return fishByLocation;
  }

  const fishByLocation = createLocationMap(displayableFish);

  return (
    <>
      <div className="tool-bar">
        <div
          className={`button-container ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          <div className="season-buttons">
            <button className="season-button" onClick={selectAll}>
              Select All
            </button>
            <button className="season-button" onClick={selectAllCC}>
              Select All CC
            </button>
            <button className="season-button" onClick={clearAll}>
              Clear All
            </button>
            <button className="season-button" onClick={setStartingSeason}>
              Set Starting Season
            </button>
            <div className="season-selector">
              <button className="season-button" onClick={prevSeason}>
                Prev Season
              </button>
              <button className="season-button" onClick={nextSeason}>
                Next Season
              </button>
            </div>
          </div>
          <div className="view-info-toggles">
            <button className="view-info-toggle" onClick={toggleSeasonInfo}>
              <span className="button-text">
                {showInfo ? "Hide Info" : "Show Info"}
              </span>
            </button>
            <button className="view-info-toggle" onClick={toggleResults}>
              <span className="button-text">
                {showResults ? "Hide Results" : "Show Results"}
              </span>
              <span
                className={`toggle-info-icon ${isExpanded ? "" : "rotate"}`}
              >
                ▼
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fishing-route-display-container ${
          showResults ? "expanded" : "collapsed"
        }`}
      >
        <div className="fishing-route-display">
          <div className="locations-container">
            <SeasonInfo curStartSeason={curStartSeason} curSeason={curSeason} />
            <FishLocations
              fishByLocation={fishByLocation}
              fishInfoMap={{ fishInfoShown, setFishInfoShown }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
