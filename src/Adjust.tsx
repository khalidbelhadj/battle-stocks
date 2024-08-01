import {
  daysLimits,
  difficultyLimits,
  durationLimits,
  useConfig,
} from "./ConfigContext";

export default function Adjust() {
  const [config, setConfig] = useConfig();
  if (!config) throw new Error("Config must be set to start setup");

  return (
    <div id="adjust">
      <div className="slider-container">
        <div className="slider-header">
          <div>Difficulty</div>
          <div>{config.difficulty} / 5</div>
        </div>
        <input
          className="slider"
          type="range"
          min={difficultyLimits[0]}
          max={difficultyLimits[1]}
          value={config.difficulty}
          onChange={(e) =>
            setConfig({
              ...config,
              difficulty: +e.target.value,
            })
          }
        />
      </div>
      <div className="slider-container">
        <div className="slider-header">
          <div>Days</div>
          <div>{config.days} days</div>
        </div>
        <input
          className="slider"
          type="range"
          min={daysLimits[0]}
          max={daysLimits[1]}
          value={config.days}
          onChange={(e) =>
            setConfig({
              ...config,
              days: +e.target.value,
            })
          }
        />
      </div>
      <div className="slider-container">
        <div className="slider-header">
          <div>Duration</div>
          <div>{config.duration} mins</div>
        </div>
        <input
          className="slider"
          type="range"
          min={durationLimits[0]}
          max={durationLimits[1]}
          value={config.duration}
          onChange={(e) =>
            setConfig({
              ...config,
              duration: +e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
