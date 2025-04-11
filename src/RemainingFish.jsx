import React from "react";
import stardewFish from "./stardewFish";
import fishData from "./fish.json";
import fishImages from "./ImportFishImages";
import "./RemainingFish.css";

const RemainingFish = ({ selectedState }) => {
  const { isSelectedMapState, setIsSelectedMapState } = selectedState;
  return (
    <div
      className="remaining-fish-wrapper"
      role="region"
      aria-label="Fish Collection Grid"
    >
      <div className="remaining-fish-header">
        <h2 id="remaining-fish-heading">Remaining Fish</h2>
      </div>
      <div
        className="remaining-fish"
        role="grid"
        aria-labelledby="remaining-fish-heading"
      >
        {stardewFish.map((fishName, index) => {
          const fishImageName = fishData[fishName].Image;
          const isSelected = isSelectedMapState.get(fishName);
          const selectedText = isSelected ? "not caught" : "caught";

          return (
            <button
              className="remaining-fish-item-button"
              onClick={() => {
                setIsSelectedMapState((oldMap) =>
                  new Map(oldMap).set(fishName, !oldMap.get(fishName))
                );
              }}
              key={index}
              tabIndex={0}
              role="gridcell"
              aria-pressed={isSelected}
              aria-label={`${fishName}, ${selectedText}`}
            >
              <div
                className={
                  isSelectedMapState.get(fishName)
                    ? "remaining-fish-item"
                    : "remaining-fish-item-selected"
                }
              >
                <div className="remaining-fish-content">
                  <img
                    className={`remaining-fish-image ${
                      isSelectedMapState.get(fishName)
                        ? "unselected"
                        : "selected"
                    }`}
                    src={fishImages[fishImageName]}
                    alt={`${fishName} illustration`}
                  />
                  <span
                    className={`remaining-fish-name ${
                      isSelectedMapState.get(fishName)
                        ? "unselected"
                        : "selected"
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
