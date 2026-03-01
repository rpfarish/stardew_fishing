import "./SeasonInfo.css";

const SeasonInfo = ({ curStartSeason, curSeason }) => {
  return (
    <div className="season-info">
      <div className="season-info__pill">
        <span className="season-info__label">Starting Season</span>
        <span className="season-info__value">{curStartSeason}</span>
      </div>
      <div className="season-info__pill season-info__pill--current">
        <span className="season-info__label">Current Season</span>
        <span className="season-info__value">{curSeason}</span>
      </div>
    </div>
  );
};

export default SeasonInfo;
