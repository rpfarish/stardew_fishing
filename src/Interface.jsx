import { useState } from "react";
import fishData from "./fish.json";

console.log(fishData["Name"]);

const Interface = () => {
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
              .map((fish) => (
                <div key={fish.Name}>{fish.Name}</div> // Render the fish names
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
