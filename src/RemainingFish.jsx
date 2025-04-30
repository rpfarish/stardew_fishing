import React from "react";
import { useState } from "react";
import stardewFish from "./stardewFish";
import fishData from "./fish.json";
import fishImages from "./ImportFishImages";
import "./RemainingFish.css";

const RemainingFish = ({ isCaughtMapState, setIsCaughtMapState }) => {
  const [sortDirection, setSortDirection] = useState("asc");
  const [alphabetSortIsActive, setAlphabetSortIsActive] = useState(false);
  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  let alphabetFish = [...stardewFish];
  alphabetFish =
    sortDirection === "asc"
      ? alphabetFish.sort()
      : alphabetFish.sort().reverse();
  const remainingFish = alphabetSortIsActive ? alphabetFish : stardewFish;
  return (
    <div
      className="remaining-fish-wrapper"
      role="region"
      aria-label="Fish Collection Grid"
    >
      <div className="remaining-fish-header-wrapper">
        <div className="remaining-fish-header">
          <h2 className="remaining-fish-heading" id="remaining-fish-heading">
            Remaining Fish
          </h2>
          <div className="sort-icons">
            <button
              className={`sort-icon-svg ${alphabetSortIsActive ? "" : "active"}`}
              onClick={() => {
                setAlphabetSortIsActive(false);
                console.log("setting to false!");
                setSortDirection("asc");
              }}
              aria-label="Toggle grid sort order"
            >
              <div className="sort-content-svg">
                <svg
                  className="sort-icon-collections"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="12">
                    <rect x="105" y="80" width="80" height="80" />
                    <rect x="215" y="80" width="80" height="80" />
                    <rect x="105" y="180" width="80" height="80" />
                    <rect x="215" y="180" width="80" height="80" />
                    <path
                      className="sort-toggle-arrow"
                      d="M180 320 L115 320 L145 290"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="sort-toggle-arrow"
                      d="M115 320 L145 350"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="sort-toggle-arrow"
                      d="M220 320 L285 320 L255 290"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="sort-toggle-arrow"
                      d="M285 320 L255 350"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </button>
            <button
              className={`sort-icon ${alphabetSortIsActive ? "active" : ""}`}
              onClick={() => {
                if (alphabetSortIsActive) toggleSort();
                setAlphabetSortIsActive(true);
                console.log("setting to true!");
              }}
              aria-label={
                sortDirection === "asc" ? "Sort A to Z" : "Sort Z to A"
              }
            >
              <div className="sort-content">
                {sortDirection === "asc" ? (
                  <>
                    <span className="sort-arrow">↓</span>
                    <span className="sort-alphabet">A-Z</span>
                  </>
                ) : (
                  <>
                    <span className="sort-arrow">↑</span>
                    <span className="sort-alphabet">Z-A</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        className="remaining-fish"
        role="grid"
        aria-labelledby="remaining-fish-heading"
      >
        {remainingFish.map((fishName, index) => {
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
