import Adjust from "./Adjust";
import { isValidConfig, useConfig } from "./ConfigContext";

export default function SetupInteractive() {
  const [config, setConfig] = useConfig();
  if (!config) throw new Error("Config must be set to start setup");
  if (config.mode !== "interactive")
    throw new Error("Rendering interactive setup with non-interactive config");

  // TODO: Use interval and fetch teamIds from client

  return (
    <div className="setup-container">
      <div className="setup">
        <div>
          <h1 className="setup-header">ADJUST YOUR GAME</h1>
          <Adjust />
        </div>
        <div id="join">
          <h1 className="setup-header">TEAMS</h1>
          <div id="join-code">{config.exchangeId}</div>
          {config.teams.length === 0 && (
            <div id="empty-joined">Join with the code...</div>
          )}
          {config.teams.length !== 0 && (
            <div id="joined-teams">
              {config.teams.map((t) => (
                <div>{t.name}</div>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            id="play"
            disabled={!isValidConfig(config)}
            onClick={() => {
              // TODO: Do validation here
              setConfig({ ...config, running: true });
            }}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
