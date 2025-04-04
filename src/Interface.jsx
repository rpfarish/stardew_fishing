import { useState } from "react";
import fishData from "./fish.json";
import filterFishBySeasons from "./filterFish";
import stardewFish from "./stardewFish";
import "./FishLocations.css";

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
  const allFishIds = stardewFish;
  const [fishInfoShown, setFishInfoShown] = useState(new Set());

  const [allFilteredFishArr, setAllFilteredFishArr] = useState(
    filterFishBySeasons(fishData, allSeasons, curStartSeason)
  );

  const [filteredFish, setFilteredFish] = useState(
    allFilteredFishArr[startCount]
  );

  const toggleResults = () => {
    setShowResults(!showResults);
    setIsExpanded(!isExpanded);
  };

  console.log("Filtered fish", filteredFish);

  let displayableFish = filteredFish.filter((fish) =>
    isSelectedMapState.get(fish.Name)
  );

  // function sortFishByLocation(fishArray, sortedFishMetric) {
  //   // Create a lookup map for fast index lookup
  //   const locationRank = new Map(
  //     sortedFishMetric.map((loc, index) => [loc, index])
  //   );

  //   // Filter out fish whose locations are not in the metric list
  //   const filteredFish = fishArray.filter((fish) =>
  //     sortedFishMetric.some((loc) => fish.Location.includes(loc))
  //   );

  //   // Sort by the first matching location in sortedFishMetric
  //   return filteredFish.sort((a, b) => {
  //     const aRank = sortedFishMetric.find((loc) => a.Location.includes(loc));
  //     const bRank = sortedFishMetric.find((loc) => b.Location.includes(loc));
  //     return (
  //       (locationRank.get(aRank) || Infinity) -
  //       (locationRank.get(bRank) || Infinity)
  //     );
  //   });
  // }

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

  // Usage:
  function sortFishAndCreateLocationMap(filteredFish, sortedFishMetric) {
    console.log("inside double function", sortedFishMetric); // Works fine
    const { locationRank, fishByLocation } = createLocationMap(
      filteredFish,
      sortedFishMetric
    );
    const sortedFish = sortFish(filteredFish, sortedFishMetric, locationRank);

    return { sortedFish, fishByLocation };
  }

  console.log("sortedFishMetric before function call:", displayableFish);
  const { sortedFish, fishByLocation } = sortFishAndCreateLocationMap(
    displayableFish,
    sortedFishMetric
  );

  // Now you can access all fish from a specific location
  const tableData = Array.from(fishByLocation, ([key, value]) => ({
    Key: key,
    Values: value.map((obj) => obj.Name).join(", "),
  }));

  console.table(tableData);

  const tableData2 = Array.from(fishByLocation, ([key, value]) => ({
    Key: key,
    Values: value.map((obj) => obj.Name),
  }));

  console.table(tableData2); // Fixed: Now displays tableData2 instead of tableData again

  // Check if "Ocean" exists in fishByLocation before logging
  if (fishByLocation.has("Ocean")) {
    console.log("fish location", fishByLocation.get("Ocean"));
  } else {
    console.log("No fish found in Ocean.");
  }

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
                let selectedMap = new Map(
                  stardewFish.map((fish) => [fish, false])
                );

                stardewFish.forEach((fish) => {
                  selectedMap.set(fish, allCCFish.has(fish));
                });

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
                if (showInfo) {
                  setFishInfoShown(new Set()); // Hide all
                } else {
                  setFishInfoShown(new Set(allFishIds)); // Show all
                }
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
              <div className="location-wrapper-wrapper">
                {Array.from(fishByLocation).map(([key, values]) => (
                  <div className="location-wrapper" key={key}>
                    <div className="location-title">{key}</div>
                    <div className="fish-names">
                      {values.map((fish, index) => (
                        <div
                          key={index}
                          className="fish-item"
                          onClick={() => {
                            const newSet = new Set(fishInfoShown);
                            const fishId = fish.Name; // You can also use index if names aren't unique
                            if (newSet.has(fishId)) {
                              newSet.delete(fishId);
                            } else {
                              newSet.add(fishId);
                            }
                            setFishInfoShown(newSet);
                          }}
                        >
                          {fish.Name}{" "}
                          {fish.Weather !== "Any" &&
                            (fish.Weather === "Sun"
                              ? "☀️"
                              : fish.Weather === "Rain"
                              ? "🌧"
                              : "")}
                          <br />
                          <div
                            className={`fish-sub-info ${
                              fishInfoShown.has(fish.Name) ? "show" : "hide"
                            }`}
                          >
                            {fish.Location} <br /> {fish.Time}
                          </div>
                        </div>
                      ))}
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
