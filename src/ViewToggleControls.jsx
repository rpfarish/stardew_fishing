import React from "react";

const ViewToggleControls = ({
  toggleSeasonInfo,
  showInfo,
  toggleResults,
  showResults,
  isExpanded,
}) => {
  return (
    <div className="view-info-toggles">
      <button className="view-info-toggle" onClick={toggleSeasonInfo}>
        <span className="button-text">
          {showInfo ? "Hide Info" : "Show Info"}
        </span>
      </button>
      <button className="view-info-toggle" onClick={toggleResults}>
        <span className="button-text">
          {showResults ? "Hide Results" : "Show Results"}
        </span>
        <span className={`toggle-info-icon ${isExpanded ? "" : "rotate"}`}>
          ▼
        </span>
      </button>
    </div>
  );
};

export default ViewToggleControls;
