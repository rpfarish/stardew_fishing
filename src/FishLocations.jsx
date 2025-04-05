import React, { useState } from "react";
import "./FishLocations.css";
const FishLocations = ({ fishByLocation, fishInfoMap }) => {
  const { fishInfoShown, setFishInfoShown } = fishInfoMap;

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
    <div className="location-wrapper-wrapper">
      {/* <div className="fish-locations-container"> */}
      {Array.from(fishByLocation).map(([key, values]) => (
        <div className="location-wrapper" key={key}>
          <div className="location-title">{key}</div>
          <div className="fish-names">
            {values.map((fish, index) => (
              <div
                key={index}
                className={`fish-item ${
                  fishInfoShown.has(fish.Name) ? "align-top" : ""
                }`}
                onClick={() => toggleFishInfo(fish.Name)}
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
    // </div>
  );
};

export default FishLocations;
