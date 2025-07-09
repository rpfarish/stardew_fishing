import React from "react";
import SeasonControlInterface from "./SeasonControlInterface";
import ViewToggleControls from "./ViewToggleControls";

const ToolbarInterface = ({
  isExpanded,
  selectAll,
  filterAllCC,
  clearAll,
  setStartingSeason,
  prevSeason,
  nextSeason,
  handleFileLoad,
  toggleSeasonInfo,
  showInfo,
  toggleResults,
  showResults,
}) => {
  return (
    <div className="tool-bar">
      <div
        className={`button-container ${isExpanded ? "expanded" : "collapsed"}`}
      >
        <SeasonControlInterface
          selectAll={selectAll}
          filterAllCC={filterAllCC}
          clearAll={clearAll}
          setStartingSeason={setStartingSeason}
          prevSeason={prevSeason}
          nextSeason={nextSeason}
          handleFileLoad={handleFileLoad}
        />
        <ViewToggleControls
          toggleSeasonInfo={toggleSeasonInfo}
          showInfo={showInfo}
          toggleResults={toggleResults}
          showResults={showResults}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};

export default ToolbarInterface;
