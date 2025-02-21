import { useState } from "react";
import fishData from "./fish.json";

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
  const [curSeason, setCurSeason] = useState("Spring");
  const allSeasons = ["Spring", "Summer", "Fall", "Winter"];

  return (
    <>
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
            setCount(newCount);
            setCurSeason(allSeasons[newCount]);
            //   console.log(isSelectedMapState);
          }}
        >
          Prev Season
        </button>
        <button
          className="season-button"
          onClick={() => {
            const newCount = count < 3 ? count + 1 : 0;
            setCount(newCount);
            setCurSeason(allSeasons[newCount]);
            //   console.log(isSelectedMapState);
          }}
        >
          Next Season
        </button>
      </div>
      <div className="outer-interface">
        <div className="interface">
          <p>Current Season {curSeason}</p>
          <div className="fish-names">
            {Object.values(fishData)
              .filter(
                (fish) =>
                  fish.Season.includes(curSeason) ||
                  fish.Season.includes("All Seasons")
              )
              .map((fish) =>
                isSelectedMapState.get(fish.Name) ? (
                  <div key={fish.Name}>
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
    </>
  );
};

export default Interface;
