import React from "react";
import SeasonInfo from "./SeasonInfo";
import FishLocations from "./FishLocations";

const FishingRouteDisplay = ({
  showResults,
  curStartSeason,
  curSeason,
  fishByLocation,
  fishInfoShown,
  setFishInfoShown,
}) => {
  return (
    <div
      className={`fishing-route-display-container ${
        showResults ? "expanded" : "collapsed"
      }`}
    >
      <div className="fishing-route-display">
        <div className="locations-container">
          <SeasonInfo curStartSeason={curStartSeason} curSeason={curSeason} />
          <FishLocations
            fishByLocation={fishByLocation}
            fishInfoMap={{ fishInfoShown, setFishInfoShown }}
            isExpanded={showResults}
          />
        </div>
      </div>
    </div>
  );
};

export default FishingRouteDisplay;
