import { useState } from "react";
import fishData from "./fish.json";
import filterFishBySeasons from "./filterFish";
import stardewFish from "./stardewFish";
import allCCFish from "./AllCCFish";

import "./FishLocations.css";
import FishLocations from "./FishLocations";
import SeasonInfo from "./SeasonInfo";

const Interface = ({ selectedState }) => {
  const { isSelectedMapState, setIsSelectedMapState } = selectedState;
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
    isSelectedMapState.get(fish.Name)
  );

  const allFishIds = stardewFish;

  const selectAll = () => {
    const selectedMap = new Map();
    for (let i = 0; i < stardewFish.length; i++)
      selectedMap.set(stardewFish[i], true);

    setIsSelectedMapState(selectedMap);
  };

  const selectAllCC = () => {
    let selectedMap = new Map(stardewFish.map((fish) => [fish, false]));
    stardewFish.forEach((fish) => {
      selectedMap.set(fish, allCCFish.has(fish));
    });

    setIsSelectedMapState(selectedMap);
  };

  const clearAll = () => {
    const selectedMap = new Map(stardewFish.map((fish) => [fish, false]));
    setIsSelectedMapState(selectedMap);
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
      setFishInfoShown(new Set(allFishIds)); // Show all
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
    setIsExpanded(!isExpanded);
  };

  const sortedFishMetric = [
    "Ocean",
    "Forest",
    "Mines",
    "Town",
    "Mountain",
    "Ginger Island",
    "Secret Woods",
    "Witch's Swamp",
    "Mutant Bug Lair",
    "Forest Pond",
    "Waterfall",
  ];

  function createLocationMap(filteredFish, sortedFishMetric) {
    const locationRank = new Map();
    const fishByLocation = new Map();

    // Populate location ranks
    sortedFishMetric.forEach((loc, index) => {
      locationRank.set(loc, index);
    });

    // Create the location map while sorting
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

    return { locationRank, fishByLocation };
  }

  function sortFish(filteredFish, sortedFishMetric, locationRank) {
    return filteredFish.sort((a, b) => {
      const aRank = sortedFishMetric.find((loc) => a.Location.includes(loc));
      const bRank = sortedFishMetric.find((loc) => b.Location.includes(loc));
      return (
        (locationRank.get(aRank) || Infinity) -
        (locationRank.get(bRank) || Infinity)
      );
    });
  }

  function sortFishAndCreateLocationMap(filteredFish, sortedFishMetric) {
    const { locationRank, fishByLocation } = createLocationMap(
      filteredFish,
      sortedFishMetric
    );
    const sortedFish = sortFish(filteredFish, sortedFishMetric, locationRank);

    return { sortedFish, fishByLocation };
  }

  const { sortedFish, fishByLocation } = sortFishAndCreateLocationMap(
    displayableFish,
    sortedFishMetric
  );

  return (
    <>
      <div className="nav-bar">
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
          <div className="toggle-info-buttons">
            <button className="toggle-info-button" onClick={toggleSeasonInfo}>
              <span className="button-text">
                {showInfo ? "Hide Info" : "Show Info"}
              </span>
            </button>
            <button className="toggle-info-button" onClick={toggleResults}>
              <span className="button-text">
                {showResults ? "Hide Results" : "Show Results"}
              </span>
              <span
                className={`toggle-info-icon ${isExpanded ? "rotate" : ""}`}
              >
                ▼
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`outer-interface ${showResults ? "expanded" : "collapsed"}`}
      >
        <div className="interface-content">
          <div className="interface">
            <SeasonInfo curStartSeason={curStartSeason} curSeason={curSeason} />
            {displayableFish.length === 0 ? (
              <p className="no-fish">No Fish</p>
            ) : (
              <FishLocations
                fishByLocation={fishByLocation}
                fishInfoMap={{ fishInfoShown, setFishInfoShown }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
