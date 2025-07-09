import { useState } from "react";
import "./Interface.css";

import allCCFish from "./AllCCFish";
import filterFishBySeasons from "./filterFish";
import fishData from "./fish.json";
import sortedFishMetric from "./SortedFishMetric";
import stardewFish from "./stardewFish";

import FishingRouteDisplay from "./FishRouteDisplay";
import ToolbarInterface from "./ToolbarInterface";

const Interface = ({
  isCaughtMapState,
  setIsCaughtMapState,
  handleFileLoad,
  curSeason,
  setCurSeason,
  curStartSeason,
  setCurStartSeason,
  filteredFish,
  setFilteredFish,
  allFilteredFishArr,
  setAllFilteredFishArr,
}) => {
  const allSeasons = ["Spring", "Summer", "Fall", "Winter"];

  const [showResults, setShowResults] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fishInfoShown, setFishInfoShown] = useState(new Set());

  let displayableFish = filteredFish.filter((fish) =>
    isCaughtMapState.get(fish.Name),
  );

  // available times for fish should be a list
  // if there are no sun fish, should the rest be rain fish?
  const groupBySeason = (fishes_obj) => {
    let sunnyFish = [];
    let anyWeatherFish = [];
    let rainyFish = [];
    fishes_obj.forEach((fish) => {
      if (fish.Weather === "Sun") {
        sunnyFish.push(fish);
      } else if (fish.Weather === "Rain") {
        rainyFish.push(fish);
      } else if (fish.Weather === "Any") {
        anyWeatherFish.push(fish);
      }
    });

    return [[...sunnyFish, ...anyWeatherFish], rainyFish];
  };

  const [sunFish, rainFish] = groupBySeason(displayableFish);

  const selectAll = () => {
    const caughtMap = new Map();
    for (let i = 0; i < stardewFish.length; i++)
      caughtMap.set(stardewFish[i], true);

    setIsCaughtMapState(caughtMap);
  };

  const filterAllCC = () => {
    let caughtMap = new Map(isCaughtMapState);
    stardewFish.forEach((fish) => {
      if (!allCCFish.has(fish)) caughtMap.set(fish, false);
    });

    setIsCaughtMapState(caughtMap);
  };

  const clearAll = () => {
    const caughtMap = new Map(stardewFish.map((fish) => [fish, false]));
    setIsCaughtMapState(caughtMap);
  };

  const setStartingSeason = () => {
    setCurStartSeason(curSeason);
    const newFilteredFish = filterFishBySeasons(
      fishData,
      allSeasons,
      curSeason,
    );

    setAllFilteredFishArr(newFilteredFish);
    const index = allSeasons.indexOf(curSeason);
    setFilteredFish(newFilteredFish[index]);
  };

  const nextSeason = () => {
    const index = allSeasons.indexOf(curSeason);
    const nextSeasonIdx = (index + 1) % allSeasons.length;
    setCurSeason(() => {
      return allSeasons[nextSeasonIdx];
    });
    setFilteredFish(allFilteredFishArr[nextSeasonIdx]);
  };

  const prevSeason = () => {
    const index = allSeasons.indexOf(curSeason);
    const prevSeasonIdx = (index - 1 + allSeasons.length) % allSeasons.length;
    setCurSeason(() => {
      return allSeasons[prevSeasonIdx];
    });
    setFilteredFish(allFilteredFishArr[prevSeasonIdx]);
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
        fish.Location.includes(loc),
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
      <ToolbarInterface
        isExpanded={isExpanded}
        selectAll={selectAll}
        filterAllCC={filterAllCC}
        clearAll={clearAll}
        setStartingSeason={setStartingSeason}
        prevSeason={prevSeason}
        nextSeason={nextSeason}
        handleFileLoad={handleFileLoad}
        toggleSeasonInfo={toggleSeasonInfo}
        showInfo={showInfo}
        toggleResults={toggleResults}
        showResults={showResults}
      />
      <FishingRouteDisplay
        showResults={showResults}
        curStartSeason={curStartSeason}
        curSeason={curSeason}
        fishByLocation={fishByLocation}
        fishInfoShown={fishInfoShown}
        setFishInfoShown={setFishInfoShown}
      />
    </>
  );
};

export default Interface;
