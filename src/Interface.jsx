import { useState } from "react";
import fishData from "./fish.json";
import filterFishBySeasons from "./filterFish";

console.log(fishData["Name"]);
const stardewFish = [
  "Albacore",
  "Anchovy",
  "Angler",
  "Blobfish",
  "Bream",
  "Bullhead",
  "Carp",
  "Catfish",
  "Chub",
  "Clam",
  "Cockle",
  "Crab",
  "Crayfish",
  "Crimsonfish",
  "Dorado",
  "Eel",
  "Flounder",
  "Ghostfish",
  "Glacierfish",
  "Goby",
  "Halibut",
  "Herring",
  "Legend",
  "Lingcod",
  "Lionfish",
  "Lobster",
  "Mussel",
  "Octopus",
  "Oyster",
  "Perch",
  "Periwinkle",
  "Pike",
  "Pufferfish",
  "Salmon",
  "Sandfish",
  "Sardine",
  "Seaweed",
  "Shad",
  "Shrimp",
  "Slimejack",
  "Snail",
  "Squid",
  "Stingray",
  "Stonefish",
  "Sturgeon",
  "Sunfish",
  "Tilapia",
  "Tuna",
  "Walleye",
  "Woodskip",
  "Blue Discus",
  "Cave Jelly",
  "Green Algae",
  "Ice Pip",
  "Largemouth Bass",
  "Lava Eel",
  "Midnight Carp",
  "Midnight Squid",
  "Mutant Carp",
  "Rainbow Trout",
  "Red Mullet",
  "Red Snapper",
  "River Jelly",
  "Scorpion Carp",
  "Sea Cucumber",
  "Sea Jelly",
  "Smallmouth Bass",
  "Spook Fish",
  "Super Cucumber",
  "Tiger Trout",
  "Void Salmon",
  "White Algae",
];

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
                const selectedMap = new Map();
                for (let i = 0; i < stardewFish.length; i++) {
                  selectedMap.set(stardewFish[i], false);
                }
                setIsSelectedMapState(selectedMap);
              }}
            >
              Clear All
            </button>
            <button
              className="season-button"
              onClick={() => {
                const newCount = count > 0 ? count - 1 : 3;
                setCount((count - 1 + 4) % 4);
                setCurSeason(allSeasons[newCount]);
                // setFilteredFish(allFilteredFishArr[newCount]);
                // setCurStartSeason(allSeasons[startCount]);
                // console.log(startCount);
                // console.log(count);
              }}
            >
              Prev Season
            </button>
            <button
              className="season-button"
              onClick={() => {
                const newCount = count < 3 ? count + 1 : 0;
                setCount((count + 1) % 4);
                console.log("new current season");
                console.log(allSeasons[newCount]);
                setCurSeason(allSeasons[newCount]);
                // setFilteredFish(allFilteredFishArr[newCount]);
                // setCurStartSeason(allSeasons[startCount]);
                // console.log(startCount);
                // console.log(count);
              }}
            >
              Next Season
            </button>
            <button
              className="season-button"
              onClick={() => {
                console.log("inside set season button");
                setStartCount(count);
                setCurStartSeason(allSeasons[count]);
                // // {allSeasons[startCount]} {curStartSeason}
                // console.log(curStartSeason);
                // setAllFilteredFishArr(
                //   filterFishBySeasons(
                //     fishData,
                //     allSeasons,
                //     allSeasons[startCount]
                //   )
                // );
                // setFilteredFish(allFilteredFishArr[startCount]);
                // console.log(startCount);
                // console.log(count);
              }}
            >
              Set Starting Season
            </button>
          </div>
          <div className="toggle-buttons">
            <button className="toggle-button" onClick={toggleResults}>
              <span className="button-text">
                {showResults ? "Hide Results" : "Show Results"}
              </span>
              <span className={`toggle-icon ${isExpanded ? "rotate" : ""}`}>
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
            <p className="starting-season">
              Starting Season: {startCount} {allSeasons[startCount]}{" "}
              {curStartSeason}
            </p>
            <p className="current-season">
              Current Season: {count} {allSeasons[count]} {curSeason}
            </p>
            <div className="fish-names">
              {Object.values(filteredFish).map((fish) =>
                isSelectedMapState.get(fish.Name) ? (
                  <div key={fish.Name} className="fish-item">
                    {fish.Name}{" "}
                    {fish.Weather !== "Any" &&
                      (fish.Weather === "Sun"
                        ? "☀️"
                        : fish.Weather === "Rain"
                        ? "🌧"
                        : "")}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
