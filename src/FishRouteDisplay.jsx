import SeasonInfo from "./SeasonInfo";
import FishLocations from "./FishLocations";

const FishingRouteDisplay = ({
  showResults,
  curStartSeason,
  curSeason,
  fishByLocation,
  fishInfoShown,
  setFishInfoShown,
  toggleSeasonInfo,
  showInfo,
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
            toggleSeasonInfo={toggleSeasonInfo}
            showInfo={showInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default FishingRouteDisplay;
