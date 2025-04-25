import "./FishLocations.css";
import findOptimalFishingWindow from "./FindOptimalFishingWindow";

const FishLocations = ({ fishByLocation, fishInfoMap, isExpanded }) => {
  const { fishInfoShown, setFishInfoShown } = fishInfoMap;
  const [s, e] = findOptimalFishingWindow([
    [6, 13],
    [14, 18],
  ]);
  console.log("fishing window", s, e);
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
      key;
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
        max: max,
      });
    }
    return newRanges;
  };
  // make a map that has the an array of the optimal window for that location
  const getOptimalWindowMap = (locationsMap) => {
    const optWinMap = new Map();
    Array.from(locationsMap).forEach(([key, vals]) => {
      let newArr = new Array();
      vals.forEach((val) => {
        newArr.push([...val.MaxTimeRangeMilitary]);
      });
      const optimalWindow = findOptimalFishingWindow(newArr);
      optWinMap.set(key, optimalWindow);
    });
    return optWinMap;
  };
  const optimalWindowMap = getOptimalWindowMap(fishByLocation);
  console.log("optimal window map", optimalWindowMap);
  console.log(fishByLocation);
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

  let fishArray = Array.from(fishByLocation);
  fishArray.sort((a, b) => {
    const timeDiffA = locationTimeRange.get(a[0]).max;
    const timeDiffB = locationTimeRange.get(b[0]).max;
    if (timeDiffA !== timeDiffB) return timeDiffA - timeDiffB; // sort by location latest ending time

    if (b[1].length !== a[1].length) return b[1].length - a[1].length; // sort by number of fish
    return a[0].localeCompare(b[0]); // sort by location name
  });
  // TODO Could fish names be its own component

  fishArray.forEach(([_, val]) => {
    val.sort((a, b) => {
      const [firstMin, firstMax] = a.MaxTimeRangeMilitary;
      const [secondMin, secondMax] = b.MaxTimeRangeMilitary;
      if (firstMax !== secondMax) return firstMax - secondMax;
      if (firstMin !== secondMin) return firstMin - secondMin;

      return a.Name.localeCompare(b.Name);
    });
  });
  // compare by
  // last TimeRangeMilitary
  // first TimeRangeMilitary
  // alphabetically
  return (
    <div className="fish-locations-container">
      {fishArray.map(([key, values]) => (
        <div className="fish-location" key={key}>
          <div className="location-title">
            {key}{" "}
            <span className="location-title-time-range">
              {optimalWindowMap.get(key)[0] === 6 &&
              optimalWindowMap.get(key)[1] === 26 ? (
                <span>Anytime</span>
              ) : (
                <span>
                  {" "}
                  {convertFromMilitaryTime(optimalWindowMap.get(key)[0])} -{" "}
                  {convertFromMilitaryTime(optimalWindowMap.get(key)[1])}
                </span>
              )}
            </span>
          </div>

          <div className="fish-names">
            {values.map((fish, index) => (
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
