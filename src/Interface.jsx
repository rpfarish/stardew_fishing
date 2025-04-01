import { useState } from "react";
import fishData from "./fish.json";
import filterFishBySeasons from "./filterFish";
import stardewFish from "./stardewFish";
// console.log(fishData["Name"]);

const allCCFish = new Set([
  "Sunfish",
  "Catfish",
  "Shad",
  "Tiger Trout",
  "Largemouth Bass",
  "Bullhead",
  "Carp",
  "Sturgeon",
  "Sardine",
  "Tuna",
  "Red Snapper",
  "Tilapia",
  "Walleye",
  "Bream",
  "Eel",
  "Woodskip",
  "Sandfish",
  "Pufferfish",
  "Ghostfish",
]);
// todo add back in secret woods
// and rain totem
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
  // function filterFishBySeasons(fishData, allSeasons, startSeason) {

  // todo add set current season
  // have next/prev seasons cycle through filtered fish

  // need just all filtered fish
  // and this current seasons fish based on starting season

  const [allFilteredFishArr, setAllFilteredFishArr] = useState(
    filterFishBySeasons(fishData, allSeasons, curStartSeason)
  );

  const [filteredFish, setFilteredFish] = useState(
    allFilteredFishArr[startCount]
  );

  // console.log(filterFishBySeasons(fishData, allSeasons, curStartSeason));
  const toggleResults = () => {
    setShowResults(!showResults);
    setIsExpanded(!isExpanded);
  };
  // what shape should the filtered sorted fish be
  // how can I get it to sort cleanly

  // the uncleaned data is really the problem
  // how should a {
  // 1: locations : [ocean, river],
  // 2: locations : [river, lake],
  // 3: locations : [ocean]
  // }
  // be sorted?

  // observation
  // all ocean fish are exclusive to ocean or ginger island
  // => no ocean fish can be caught anywhere else in the valley

  // that doesn't help with lake and river fish
  // what if the ordering of the fish was ranked by the count of fish possible in one location
  // for each season and location count the total number of fish that you can catch

  console.log("Filtered fish", filteredFish);

  let displayableFish = filteredFish.filter((fish) =>
  let displayableFish = filteredFish.filter((fish) =>
    isSelectedMapState.get(fish.Name)
  );

  function sortFishByLocation(fishArray, sortedFishMetric) {
    // Create a lookup map for fast index lookup
    const locationRank = new Map(
      sortedFishMetric.map((loc, index) => [loc, index])
    );

    // Filter out fish whose locations are not in the metric list
    const filteredFish = fishArray.filter((fish) =>
      sortedFishMetric.some((loc) => fish.Location.includes(loc))
    );

    // Sort by the first matching location in sortedFishMetric
    return filteredFish.sort((a, b) => {
      const aRank = sortedFishMetric.find((loc) => a.Location.includes(loc));
      const bRank = sortedFishMetric.find((loc) => b.Location.includes(loc));
      return (
        (locationRank.get(aRank) || Infinity) -
        (locationRank.get(bRank) || Infinity)
      );
    });
  }

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

  displayableFish = sortFishByLocation(displayableFish, sortedFishMetric);

  return (
    <>
      <div className="nav-bar">
        <div
          className={`button-container ${
            isExpanded ? "expanded" : "collapsed"
          }`}
        >
          <div className="season-buttons">
            <button
              className="season-button"
              onClick={() => {
                const selectedMap = new Map();

                for (let i = 0; i < stardewFish.length; i++) {
                  selectedMap.set(stardewFish[i], true);
                }

                setIsSelectedMapState(selectedMap);
              }}
            >
              Select All
            </button>
            <button
              className="season-button"
              onClick={() => {
                // console.log(isSelectedMapState);
                let selectedMap = new Map(
                  stardewFish.map((fish) => [fish, false])
                );

                // console.log("Before update:", selectedMap);
                stardewFish.forEach((fish) => {
                  selectedMap.set(fish, allCCFish.has(fish));
                  // console.log(fish, allCCFish.has(fish), selectedMap[fish]);
                });
                // console.log("After update:", selectedMap);

                // console.log(selectedMap);
                setIsSelectedMapState(selectedMap);
              }}
            >
              Select All CC
            </button>
            <button
              className="season-button"
              onClick={() => {
                const selectedMap = new Map(
                  stardewFish.map((fish) => [fish, false])
                );
                setIsSelectedMapState(selectedMap);
              }}
            >
              Clear All
            </button>
            <button
              className="season-button"
              onClick={() => {
                setStartCount(count);
                setCurStartSeason(allSeasons[count]);
                const newFilteredFish = filterFishBySeasons(
                  fishData,
                  allSeasons,
                  allSeasons[count]
                );

                setAllFilteredFishArr(newFilteredFish);
                setFilteredFish(newFilteredFish[count]);
              }}
            >
              Set Starting Season
            </button>
            {/* todo set gap for prev next season */}
            <div className="season-selector">
              <button
                className="season-button"
                onClick={() => {
                  const newCount = (count - 1 + 4) % 4;
                  setCount(newCount);
                  setCurSeason(allSeasons[newCount]);
                  setFilteredFish(allFilteredFishArr[newCount]);
                }}
              >
                Prev Season
              </button>
              <button
                className="season-button"
                onClick={() => {
                  const newCount = (count + 1) % 4;
                  setCount(newCount);
                  setCurSeason(allSeasons[newCount]);
                  setFilteredFish(allFilteredFishArr[newCount]);
                }}
              >
                Next Season
              </button>
            </div>
          </div>
          <div className="toggle-info-buttons">
            <button
              className="toggle-info-button"
              onClick={() => {
                setShowInfo(!showInfo);
              }}
            >
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
            <div className="season-info">
              <p className="starting-season">
                Starting Season: {curStartSeason}
              </p>
              <p className="current-season">Current Season: {curSeason}</p>
            </div>
            {displayableFish.length === 0 ? (
              <p className="no-fish">No Fish</p>
            ) : (
              <div className="fish-names">
                {displayableFish.map((fish) => (
                  <div key={fish.Name} className="fish-item">
                    {fish.Name}{" "}
                    {fish.Weather !== "Any" &&
                      (fish.Weather === "Sun"
                        ? "☀️"
                        : fish.Weather === "Rain"
                        ? "🌧"
                        : "")}
                    <br />
                    <div
                      className={`fish-sub-info ${showInfo ? "show" : "hide"}`}
                    >
                      {fish.Location} <br /> {fish.Time}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
