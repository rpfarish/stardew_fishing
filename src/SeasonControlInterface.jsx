import React from "react";
import StardewFishParser from "./StardewFishParser";

const SeasonControlInterface = ({
  selectAll,
  filterAllCC,
  clearAll,
  setStartingSeason,
  prevSeason,
  nextSeason,
  handleFileLoad,
}) => {
  return (
    <div className="season-buttons">
      <button className="season-button" onClick={selectAll}>
        Select All
      </button>
      <button className="season-button" onClick={filterAllCC}>
        Filter All CC
      </button>
      <button className="season-button" onClick={clearAll}>
        Clear All
      </button>
      <button className="season-button" onClick={setStartingSeason}>
        Set Starting Season
      </button>
      <div className="season-selector">
        <button className="season-button" onClick={prevSeason}>
          Prev Season
        </button>
        <button className="season-button" onClick={nextSeason}>
          Next Season
        </button>
      </div>
      <StardewFishParser handleFileLoad={handleFileLoad} />
    </div>
  );
};

export default SeasonControlInterface;
