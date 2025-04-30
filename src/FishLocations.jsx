import "./FishLocations.css";
import findOptimalFishingWindow from "./FindOptimalFishingWindow.js";

const FishLocations = ({ fishByLocation, fishInfoMap, isExpanded }) => {
  const { fishInfoShown, setFishInfoShown } = fishInfoMap;

  if (fishByLocation.size === 0) return <p className="no-fish">No Fish</p>;

  const convertFromMilitaryTime = (hour) => {
    hour %= 24;
    const meridiem = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return `${hour}${meridiem}`;
  };

  const optimalWindowMap = new Map();
  Array.from(fishByLocation).forEach(([location, fishes]) => {
    const timeRanges = fishes.map((fish) => [...fish.MaxTimeRangeMilitary]);
    optimalWindowMap.set(location, findOptimalFishingWindow(timeRanges));
  });

  const toggleFishInfo = (fishId) => {
    const newSet = new Set(fishInfoShown);
    if (newSet.has(fishId)) {
      newSet.delete(fishId);
    } else {
      newSet.add(fishId);
    }
    setFishInfoShown(newSet);
  };

  // Sort fish locations
  let fishArray = Array.from(fishByLocation);
  fishArray.sort((a, b) => {
    const [, aFishes] = a;
    const [, bFishes] = b;

    // Get max ending times for each location
    const aMaxTime = Math.max(
      ...aFishes.map((fish) => fish.MaxTimeRangeMilitary[1]),
    );
    const bMaxTime = Math.max(
      ...bFishes.map((fish) => fish.MaxTimeRangeMilitary[1]),
    );

    if (aMaxTime !== bMaxTime) return aMaxTime - bMaxTime;
    if (bFishes.length !== aFishes.length)
      return bFishes.length - aFishes.length;
    return a[0].localeCompare(b[0]);
  });

  // Sort fish within each location
  fishArray.forEach(([_, fishes]) => {
    fishes.sort((a, b) => {
      const [aMin, aMax] = a.MaxTimeRangeMilitary;
      const [bMin, bMax] = b.MaxTimeRangeMilitary;

      if (aMax !== bMax) return aMax - bMax;
      if (aMin !== bMin) return aMin - bMin;
      return a.Name.localeCompare(b.Name);
    });
  });

  return (
    <div className="fish-locations-container">
      {fishArray.map(([location, fishes]) => {
        const [startHour, endHour] = optimalWindowMap.get(location);
        const isAnytime = startHour === 6 && endHour === 26;

        return (
          <div className="fish-location" key={location}>
            <div className="location-title">
              {location}{" "}
              <span className="location-title-time-range">
                {isAnytime ? (
                  <span>Anytime</span>
                ) : (
                  <span>
                    {" "}
                    {convertFromMilitaryTime(startHour)} -{" "}
                    {convertFromMilitaryTime(endHour)}
                  </span>
                )}
              </span>
            </div>

            <div className="fish-names">
              {fishes.map((fish, index) => (
                <button
                  key={index}
                  tabIndex={isExpanded ? 0 : -1}
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
                      (fish.Weather === "Sun" ? (
                        <div className="tooltip">
                          ☀️ <span className="tooltip-text"> :Sunny: </span>
                        </div>
                      ) : fish.Weather === "Rain" ? (
                        <div className="tooltip">
                          🌧{" "}
                          <span className="tooltip-text"> :Rainy: </span>{" "}
                        </div>
                      ) : (
                        ""
                      ))}
                    <br />
                    <div
                      className={`fish-sub-info ${
                        fishInfoShown.has(fish.Name) ? "show" : "hide"
                      }`}
                    >
                      {fish.TimeRanges.map(([startTime, endTime], index) =>
                        startTime === "6am" && endTime === "2am" ? (
                          <span key={index}>Anytime</span>
                        ) : (
                          <span key={index}>
                            {index > 0 && <br />}
                            {startTime} - {endTime}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FishLocations;
