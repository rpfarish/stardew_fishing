import React, { useState } from "react";
import "./FishLocations.css";
const FishLocations = ({ fishByLocation, fishInfoMap }) => {
  const { fishInfoShown, setFishInfoShown } = fishInfoMap;

  if (fishByLocation.size === 0) return <p className="no-fish">No Fish</p>;

  const toggleFishInfo = (fishId) => {
    const newSet = new Set(fishInfoShown);
    if (newSet.has(fishId)) {
      newSet.delete(fishId);
    } else {
      newSet.add(fishId);
    }
    setFishInfoShown(newSet);
  };

  return (
    <div className="fish-locations-container">
      {Array.from(fishByLocation).map(([key, values]) => (
        <div className="fish-location" key={key}>
          <div className="location-title">{key}</div>
          <div className="fish-names">
            {values.map((fish, index) => (
              <button
                key={index}
                className="fish-item-button"
                onClick={() => toggleFishInfo(fish.Name)}
              >
                <div
                  className={`fish-item ${
                    fishInfoShown.has(fish.Name) ? "align-top" : ""
                  }`}
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
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FishLocations;
