import { useState } from "react";
import fishData from "./fish.json";

console.log(fishData["Name"]);

// todo add back in secret woods
// and rain totem
const Interface = ({ selectedState }) => {
  const { isSelectedMapState, setIsSelectedMapState } = selectedState;
  const [count, setCount] = useState(0);
  const [curSeason, setCurSeason] = useState("Spring");
  const allSeasons = ["Spring", "Summer", "Fall", "Winter"];

  return (
    <>
      <button
        onClick={() => {
          const newCount = count < 3 ? count + 1 : 0;
          setCount(newCount);
          setCurSeason(allSeasons[newCount]);
          console.log(isSelectedMapState);
        }}
      >
        Click me
      </button>
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
                  <div key={fish.Name}>{fish.Name}</div>
                ) : null
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
