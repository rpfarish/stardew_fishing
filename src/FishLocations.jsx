import { useState, useEffect, useRef } from "react";
import "./FishLocations.css";

// ─── findOptimalFishingWindow ────────────────────────────────────────────────
function findOptimalFishingWindow(availabilityTimes) {
  const sortedTimes = [...availabilityTimes].sort((a, b) => a[1] - b[1]);
  const mergedTimes = [];
  let removedTimesCount = 0;
  console.log("Available", availabilityTimes);

  for (const time of sortedTimes) {
    if (
      mergedTimes.length === 0 ||
      time[0] >= mergedTimes[mergedTimes.length - 1][1]
    ) {
      mergedTimes.push([...time]);
    } else {
      const newInterval = [mergedTimes[mergedTimes.length - 1][1], time[1]];
      if (newInterval[0] !== newInterval[1]) {
        mergedTimes.push(newInterval);
      } else {
        removedTimesCount++;
      }
    }
  }

  console.log(mergedTimes.length, "Merged", mergedTimes);
  if (mergedTimes.length === 1) {
    const newWindow = mergedTimes[0];
    const startTime = newWindow[0];
    const endTime = newWindow[1];
    const scheduledEndTime = startTime + removedTimesCount + 1;
    const newEndTime = scheduledEndTime > endTime ? endTime : scheduledEndTime;
    return [startTime, newEndTime];
  }

  const hoursAvailable = Array(48)
    .fill()
    .map(() => new Set());
  mergedTimes.forEach((time, fishId) => {
    const [start, end] = time;
    for (let hour = start; hour < end; hour++) {
      hoursAvailable[hour].add(fishId);
    }
  });

  const totalFish = mergedTimes.length;
  let bestWindow = null;

  for (let startHour = 0; startHour < 24; startHour++) {
    for (let length = 1; length <= 24; length++) {
      const fishCovered = new Set();
      for (let offset = 0; offset < length; offset++) {
        const hour = startHour + offset;
        if (hour < 48)
          hoursAvailable[hour].forEach((fishId) => fishCovered.add(fishId));
      }
      if (fishCovered.size === totalFish) {
        const fishing_window = [startHour, startHour + length];
        if (bestWindow === null || length < bestWindow[1] - bestWindow[0])
          bestWindow = fishing_window;
        break;
      }
    }
  }

  return bestWindow;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const convertFromMilitaryTime = (hour) => {
  hour %= 24;
  const meridiem = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return `${hour}${meridiem}`;
};

const BAR_START = 6;
const BAR_END = 26;

function timeToPercent(hour) {
  return ((hour - BAR_START) / (BAR_END - BAR_START)) * 100;
}

// ─── PDF Export ───────────────────────────────────────────────────────────────
async function exportToPDF(gridEl, theme) {
  // Dynamically import so the bundle doesn't pay the cost unless used
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const scale = 2; // retina
  const canvas = await html2canvas(gridEl, {
    scale,
    useCORS: true,
    backgroundColor: theme === "dark" ? "#080c18" : "#f0f2f8",
    logging: false,
  });

  const imgW = 190; // mm — A4 content width with 10mm margins each side
  const imgH = (canvas.height / canvas.width) * imgW;
  const pageH = 277; // A4 height minus margins

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  let yOffset = 0;

  // Slice canvas into A4 pages
  while (yOffset < imgH) {
    if (yOffset > 0) pdf.addPage();
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      10, // x margin
      10 - yOffset, // shift image up as we page
      imgW,
      imgH,
    );
    yOffset += pageH;
  }

  pdf.save("fish-locations.pdf");
}

// ─── Availability Bar ─────────────────────────────────────────────────────────
function AvailabilityBar({ fish, windowStart, windowEnd, toggle }) {
  const [start, end] = fish.MaxTimeRangeMilitary;
  const left = Math.max(0, timeToPercent(start));
  const right = Math.min(100, timeToPercent(end));
  const width = right - left;
  const winLeft = Math.max(0, timeToPercent(windowStart));
  const winRight = Math.min(100, timeToPercent(windowEnd));

  const fillClass =
    fish.Weather === "Sun"
      ? "avail-bar__fill--sun"
      : fish.Weather === "Rain"
        ? "avail-bar__fill--rain"
        : "avail-bar__fill--any";

  return (
    <div className="avail-bar" onClick={toggle}>
      <div
        className="avail-bar__window-highlight"
        style={{ left: `${winLeft}%`, width: `${winRight - winLeft}%` }}
      />
      <div
        className={`avail-bar__fill ${fillClass}`}
        style={{ left: `${left}%`, width: `${width}%` }}
      />
    </div>
  );
}

// ─── Time Axis ────────────────────────────────────────────────────────────────
function TimeAxis() {
  const ticks = [6, 9, 12, 15, 18, 21, 24, 26];
  return (
    <div className="time-axis">
      {ticks.map((h) => (
        <span
          key={h}
          className="time-axis__tick"
          style={{ left: `${timeToPercent(h)}%` }}
        >
          {convertFromMilitaryTime(h)}
        </span>
      ))}
    </div>
  );
}

// ─── Fish Row ─────────────────────────────────────────────────────────────────
function FishRow({
  fish,
  isOpen,
  onToggle,
  windowStart,
  windowEnd,
  tabIndex,
  showBars,
}) {
  const weatherIcon =
    fish.Weather === "Sun" ? "☀️" : fish.Weather === "Rain" ? "🌧" : null;

  return (
    <div className="fish-row">
      <button className="fish-row__btn" tabIndex={tabIndex} onClick={onToggle}>
        <span
          className={`fish-row__caret${isOpen ? " fish-row__caret--open" : ""}`}
        >
          {isOpen ? "▾" : "▸"}
        </span>
        <span className="fish-row__name">{fish.Name}</span>
        {weatherIcon && (
          <span
            className="fish-row__weather-icon"
            title={fish.Weather === "Sun" ? "Sunny weather" : "Rainy weather"}
          >
            {weatherIcon}
          </span>
        )}
      </button>

      {showBars && (
        <AvailabilityBar
          fish={fish}
          windowStart={windowStart}
          windowEnd={windowEnd}
          toggle={onToggle}
        />
      )}

      {isOpen && (
        <div className="fish-row__times">
          {fish.TimeRanges.map(([s, e], i) =>
            s === "6am" && e === "2am" ? (
              <div key={i}>Anytime</div>
            ) : (
              <div key={i}>
                {s} – {e}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

// ─── Location Card ────────────────────────────────────────────────────────────
function LocationCard({
  location,
  fishes,
  isExpanded,
  fishInfoShown,
  onToggleFish,
  showBars,
}) {
  const timeRanges = fishes.map((f) => [...f.MaxTimeRangeMilitary]);
  const [winStart, winEnd] = findOptimalFishingWindow(timeRanges);
  const isAnytime = winStart === 6 && winEnd === 26;
  const windowWidthPct = timeToPercent(winEnd) - timeToPercent(winStart);

  const sortedFish = [...fishes].sort((a, b) => {
    if (a.MaxTimeRangeMilitary[1] !== b.MaxTimeRangeMilitary[1])
      return a.MaxTimeRangeMilitary[1] - b.MaxTimeRangeMilitary[1];
    if (a.MaxTimeRangeMilitary[0] !== b.MaxTimeRangeMilitary[0])
      return a.MaxTimeRangeMilitary[0] - b.MaxTimeRangeMilitary[0];
    return a.Name.localeCompare(b.Name);
  });

  return (
    <div className="location-card">
      <div className="location-card__header">
        <h3 className="location-card__name">{location}</h3>
        <span className="location-card__window-badge">
          {isAnytime
            ? "Anytime"
            : `${convertFromMilitaryTime(winStart)} – ${convertFromMilitaryTime(winEnd)}`}
        </span>
      </div>

      {!isAnytime && (
        <div className="location-card__window-bar">
          <div
            className="location-card__window-bar-fill"
            style={{
              left: `${timeToPercent(winStart)}%`,
              width: `${windowWidthPct}%`,
            }}
          />
        </div>
      )}

      <TimeAxis />

      {sortedFish.map((fish) => (
        <FishRow
          key={fish.Name}
          fish={fish}
          isOpen={fishInfoShown.has(fish.Name)}
          onToggle={() => onToggleFish(fish.Name)}
          windowStart={winStart}
          windowEnd={winEnd}
          tabIndex={isExpanded ? 0 : -1}
          showBars={showBars}
        />
      ))}
    </div>
  );
}

// ─── Theme key (matches App.jsx) ─────────────────────────────────────────────
const THEME_STORAGE_KEY = "stardew-fish-route-planner-theme";

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// ─── FishLocations ────────────────────────────────────────────────────────────
const FishLocations = ({ fishByLocation, fishInfoMap, isExpanded }) => {
  const { fishInfoShown, setFishInfoShown } = fishInfoMap;
  const [filter, setFilter] = useState("All");
  const [showBars, setShowBars] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const gridRef = useRef(null);

  // Stay in sync if the theme is changed elsewhere in the app
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("color-scheme");
      if (current) setTheme(current);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["color-scheme"],
    });
    return () => observer.disconnect();
  }, []);

  if (fishByLocation.size === 0)
    return <p className="fish-no-results">No Fish</p>;

  const toggleFishInfo = (fishName) => {
    const newSet = new Set(fishInfoShown);
    newSet.has(fishName) ? newSet.delete(fishName) : newSet.add(fishName);
    setFishInfoShown(newSet);
  };

  const handleExport = async () => {
    if (!gridRef.current || exporting) return;
    setExporting(true);
    try {
      await exportToPDF(gridRef.current, theme);
    } finally {
      setExporting(false);
    }
  };

  let fishArray = Array.from(fishByLocation);
  fishArray.sort((a, b) => {
    const [, af] = a,
      [, bf] = b;
    const aMax = Math.max(...af.map((f) => f.MaxTimeRangeMilitary[1]));
    const bMax = Math.max(...bf.map((f) => f.MaxTimeRangeMilitary[1]));
    if (aMax !== bMax) return aMax - bMax;
    if (bf.length !== af.length) return bf.length - af.length;
    return a[0].localeCompare(b[0]);
  });

  fishArray.forEach(([, fishes]) => {
    fishes.sort((a, b) => {
      const [aMin, aMax] = a.MaxTimeRangeMilitary;
      const [bMin, bMax] = b.MaxTimeRangeMilitary;
      if (aMax !== bMax) return aMax - bMax;
      if (aMin !== bMin) return aMin - bMin;
      return a.Name.localeCompare(b.Name);
    });
  });

  const filtered = fishArray
    .map(([loc, fishes]) => [
      loc,
      filter === "All"
        ? fishes
        : fishes.filter((f) => f.Weather === filter || f.Weather === "Any"),
    ])
    .filter(([, fishes]) => fishes.length > 0);

  const isDark = theme === "dark";

  return (
    <div className="fish-root">
      {exporting && <div className="fish-export-overlay">Generating PDF…</div>}

      <div className="fish-header">
        <div className="fish-header__title-row">
          <span className="fish-header__icon">🎣</span>
          <h1 className="fish-header__title">Fish Locations</h1>
        </div>
        <p className="fish-header__subtitle">
          Recommended fishing windows · color bars show availability
        </p>
      </div>

      <div className="fish-controls">
        {/* Windows toggle */}
        <button
          className={`fish-btn${showBars ? " fish-btn--active" : ""}`}
          onClick={() => setShowBars((v) => !v)}
          title="Toggle availability windows"
        >
          ▬ Bars
        </button>

        <div className="fish-controls__spacer" />

        {/* Export */}
        <button
          className="fish-btn fish-btn--export"
          onClick={handleExport}
          disabled={exporting}
          title="Export to PDF"
        >
          {exporting ? "Exporting…" : "↓ Export PDF"}
        </button>

        {/* Legend */}
        <div className="fish-legend">
          {[
            ["#4eca8b", "Any"],
            ["#f6c94e", "Sunny"],
            ["#6facd5", "Rainy"],
          ].map(([c, l]) => (
            <span key={l} className="fish-legend__item">
              <span className="fish-legend__swatch" style={{ background: c }} />
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="fish-grid" ref={gridRef}>
        {filtered.length === 0 ? (
          <p className="fish-no-results">No fish match current filter.</p>
        ) : (
          filtered.map(([loc, fishes]) => (
            <LocationCard
              key={loc}
              location={loc}
              fishes={fishes}
              isExpanded={isExpanded}
              fishInfoShown={fishInfoShown}
              onToggleFish={toggleFishInfo}
              showBars={showBars}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FishLocations;
