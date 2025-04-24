import "./FishLocations.css";

const FishLocations = ({ fishByLocation, fishInfoMap }) => {
  const { fishInfoShown, setFishInfoShown } = fishInfoMap;

  if (fishByLocation.size === 0) return <p className="no-fish">No Fish</p>;

  const convertFromMilitaryTime = (hour) => {
    hour %= 24;
    const meridiem = hour >= 12 ? "pm" : "am";
    hour %= 12;
    if (hour === 0) hour = 12;
    return `${hour}${meridiem}`;
  };

  const getLocationRange = (locationMap) => {
    let newRanges = new Map();
    for (const [key, values] of locationMap) {
      let min = 26;
      let max = 6;
      values.forEach((val) => {
        if (val.Time === "Anytime") return;
        const [start, end] = val.MaxTimeRangeMilitary;
        min = start < min ? start : min;
        max = end > max ? end : max;
      });

      if (min > max) {
        const temp = max;
        max = min;
        min = temp;
      }
      newRanges.set(key, {
        start: convertFromMilitaryTime(min),
        end: convertFromMilitaryTime(max),
      });
    }
    return newRanges;
  };

  const locationTimeRange = getLocationRange(fishByLocation);

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
          <div className="location-title">
            {key}{" "}
            <span className="location-title-time-range">
              {locationTimeRange.get(key).start === "6am" &&
              locationTimeRange.get(key).end === "2am" ? (
                <span>Anytime</span>
              ) : (
                <span>
                  {" "}
                  {locationTimeRange.get(key).start} -{" "}
                  {locationTimeRange.get(key).end}
                </span>
              )}
            </span>
          </div>
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
      ))}
    </div>
  );
};

export default FishLocations;
