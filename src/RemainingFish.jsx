import React from "react";
import stardewFish from "./stardewFish";
import fishData from "./fish.json";
import fishImages from "./ImportFishImages";
import "./RemainingFish.css";

const RemainingFish = ({ isCaughtMapState, setIsCaughtMapState }) => {
  return (
    <div
      className="remaining-fish-wrapper"
      role="region"
      aria-label="Fish Collection Grid"
    >
      <div className="remaining-fish-header">
        <h2 className="remaining-fish-heading" id="remaining-fish-heading">
          Remaining Fish
        </h2>
      </div>
      <div
        className="remaining-fish"
        role="grid"
        aria-labelledby="remaining-fish-heading"
      >
        {stardewFish.map((fishName, index) => {
          const fishImageName = fishData[fishName].Image;
          const isCaught = !isCaughtMapState.get(fishName);
          const CaughtText = !isCaught ? "not caught" : "caught";

          return (
            <button
              className="remaining-fish-item-button"
              onClick={() => {
                setIsCaughtMapState((oldMap) =>
                  new Map(oldMap).set(fishName, !oldMap.get(fishName)),
                );
              }}
              key={index}
              tabIndex={0}
              role="gridcell"
              aria-pressed={isCaught}
              aria-label={`${fishName}, ${CaughtText}`}
            >
              <div
                className={`remaining-fish-item ${
                  isCaughtMapState.get(fishName) ? "uncaught" : "caught"
                }`}
              >
                <div className="remaining-fish-content">
                  <img
                    className={`remaining-fish-image ${
                      isCaughtMapState.get(fishName) ? "uncaught" : "caught"
                    }`}
                    src={fishImages[fishImageName]}
                    alt={`${fishName} illustration`}
                  />
                  <span
                    className={`remaining-fish-name ${
                      isCaughtMapState.get(fishName) ? "uncaught" : "caught"
                    }`}
                  >
                    {fishName}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RemainingFish;
