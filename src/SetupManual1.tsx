import { useState } from "react";
import { Config, defaultConfig, Difficulty, Mode, Team } from "./manual-mode";

const steps = ["adjust", "teams", "game"] as const;
type Step = (typeof steps)[number];

export default function SetupManual() {
  const [step, setStep] = useState<Step>("adjust");
  const [config, setConfig] = useState<Config>(defaultConfig);
  const setDays = (days: number) => setConfig({ ...config, days });
  const setDifficulty = (difficulty: Difficulty) =>
    setConfig({ ...config, difficulty });
  const setTeams = (teams: Team[]) => setConfig({ ...config, teams });

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {step === "adjust" && (
        <div>
          <h1>Adjust your game</h1>
          <div className="slider">
            <div>Days {config.days}</div>
            <input
              value={config.days}
              id="slider"
              type="range"
              min="1"
              max="10"
              onChange={(e) => setDays(+e.target.value)}
            />
          </div>
          <div className="slider">
            <div>Difficulty {config.difficulty}</div>
            <input
              value={config.difficulty}
              id="slider"
              type="range"
              min="1"
              max="5"
              onChange={(e) => setDifficulty(+e.target.value as Difficulty)}
            />
          </div>
          <button className="continue-button" onClick={() => setStep("teams")}>
            Continue
          </button>
        </div>
      )}
      {/* {step === "teams" && (
        <div id="team-div">
          <h1 >Add teams</h1>
          <button
            onClick={() => {
              if (config.teams.length >= 5) {
                alert("5 is the maximum number of teams");
                return;
              }
              setTeams([`Team`, ...config.teams]);
            }}
            id="add-team"
          >
            +
          </button>
          <div id="team-list">
            {config.teams.map((team) => (
              <input
                className="team"
                value={team}
                onChange={(e) => {
                  config.teams.find((x) => x === team);
                  if (!team) return;
                  team = e.target.value;
                  setTeams([...teams]);
                }}
              />
            ))}
          </div>
          <button
            disabled={teams.length === 0}
            type="button"
            id="go-button"
            onClick={() => setConfig("done")}
          >
            Go!
          </button>
        </div>
      )} */}
    </div>
  );
}
