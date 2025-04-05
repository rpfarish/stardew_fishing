const SeasonInfo = ({ curStartSeason, curSeason }) => {
  return (
    <div className="season-info">
      <p className="starting-season">Starting Season: {curStartSeason}</p>
      <p className="current-season">Current Season: {curSeason}</p>
    </div>
  );
};

export default SeasonInfo;
