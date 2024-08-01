import { useState } from "react";
import { Config, defaultConfig, Difficulty, Mode, Team } from "./manual-mode";

const steps = ["start", "mode", "days", "teams", "game"];
type Step = (typeof steps)[number];

export default function Setup() {
  const [step, setStep] = useState<Step>("start");
  const [config, setConfig] = useState<Config>(defaultConfig);
  const setMode = (mode: Mode) => setConfig({ ...config, mode });
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
      {step !== "start" && (
        <button
          id="back-button"
          onClick={() => setStep((prev) => steps[steps.indexOf(prev) - 1])}
        >
          Back
        </button>
      )}
      {step === "start" && (
        <div>
          <h1>Battle Stocks</h1>
          <button onClick={() => setStep("mode")} id="start-button">
            Play
          </button>
        </div>
      )}
      {step === "mode" && (
        <div>
          <h1>Choose a game mode</h1>
          <div id="mode-picker">
            <button
              onClick={() => setMode("interactive")}
              className={`${config.mode === "interactive" && "selected-mode"}`}
            >
              <h2>Interactive</h2>
              <p>Trade stocks in real time</p>
            </button>
            <button
              onClick={() => setMode("manual")}
              className={`${config.mode === "manual" && "selected-mode"}`}
            >
              <h2>Manual</h2>
              <p>Buy and sell stocks after every day</p>
            </button>

            <button
              onClick={() => setMode("individual")}
              className={`${config.mode === "individual" && "selected-mode"}`}
            >
              <h2>Individual</h2>
              <p>Play individually to maximise profit</p>
            </button>
          </div>
          <button className="continue-button" onClick={() => setStep("days")}>
            Continue
          </button>
        </div>
      )}
      {step === "days" && (
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
