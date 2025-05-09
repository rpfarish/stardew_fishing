import "./SeasonInfo.css";

const SeasonInfo = ({ curStartSeason, curSeason }) => {
  return (
    <div className="season-info">
      <p className="starting-season">
        Starting Season: <br />
        <span className="season-value">{curStartSeason}</span>
      </p>
      <p className="current-season">
        Current Season: <br />
        <span className="season-value">{curSeason}</span>
      </p>
    </div>
  );
};

export default SeasonInfo;
