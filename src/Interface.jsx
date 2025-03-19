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
            <div className="season-info">
              <p className="starting-season">
                Starting Season: {curStartSeason}
              </p>
              <p className="current-season">Current Season: {curSeason}</p>
            </div>
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
