import { useRef } from "react";
import { isValidConfig, useConfig } from "./ConfigContext";
import Adjust from "./Adjust";

let nextId = 4;
export default function SetupManual() {
  const [config, setConfig] = useConfig();
  if (!config) throw new Error("Config must be set to start setup");
  if (config.mode !== "manual")
    throw new Error("Rendering manual setup with non-manual config");

  const ref = useRef<HTMLInputElement>(null);
  const createTeam = (name: string) => {
    if (name.trim().length === 0) return;
    setConfig({ ...config, teams: [{ name, id: nextId }, ...config.teams] });
    ++nextId;
  };

  const renameTeam = (id: number, newName: string | undefined) => {
    if (!newName || newName.trim().length === 0) return;
    const team = config.teams.find((t) => t.id === id);
    if (!team) return;
    team.name = newName;
    setConfig({ ...config });
  };

  // const deleteTeam = (id: number) => setTeams(teams.filter((t) => t.id != id));

  return (
    <div className="setup-container">
      <div className="setup">
        <div>
          <h1 className="setup-header">ADJUST YOUR GAME</h1>
          <Adjust />
        </div>
        <div>
          <h1 className="setup-header">ADD TEAMS</h1>

          <form
            className="teams-list-item"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ref.current) return;
              createTeam(ref.current.value);
              ref.current.value = "";
            }}
          >
            <input
              placeholder="Team name..."
              ref={ref}
              className="team-input"
              autoFocus
              autoCorrect="no"
            />
          </form>
          {config.teams.length > 0 && (
            <div id="teams-list">
              <>
                {config.teams.map((team) => (
                  <form
                    key={`team-${team.id}`}
                    className="teams-list-item"
                    onSubmit={(e) => {
                      e.preventDefault();
                      renameTeam(
                        team.id,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (e.target as any).name.value
                      );
                    }}
                  >
                    <input
                      className="team-input"
                      name="name"
                      defaultValue={team.name}
                      autoCorrect="no"
                      onBlur={(e) => renameTeam(team.id, e.target.value)}
                    />
                  </form>
                ))}
              </>
            </div>
          )}
        </div>
        <div>
          <button
            id="play"
            disabled={!isValidConfig(config)}
            onClick={() => setConfig({ ...config, running: true })}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
