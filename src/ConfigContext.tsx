import { createContext, ReactNode, useContext, useState } from "react";

export const daysLimits = [1, 10];
export const difficultyLimits = [1, 5];
export const durationLimits = [5, 30];
export const minTeams = 2;

export type Mode = "interactive" | "manual";

export type Team = {
  id: number;
  name: string;
};

type ConfigBase = {
  running: boolean;
  days: number;
  difficulty: number;
  duration: number;
  teams: Team[];
};

export type ManualConfig = ConfigBase & {
  mode: "manual";
};

export type InteractiveConfig = ConfigBase & {
  mode: "interactive";
  exchangeId: string;
};

export type Config = ManualConfig | InteractiveConfig;

export const isValidConfig = (config: Config) => {
  const validBase =
    daysLimits[0] <= config.days &&
    config.days <= daysLimits[1] &&
    difficultyLimits[0] <= config.difficulty &&
    config.difficulty <= difficultyLimits[1] &&
    durationLimits[0] <= config.duration &&
    config.duration <= durationLimits[1] &&
    config.teams.length >= minTeams;

  switch (config.mode) {
    case "interactive":
      return validBase && !!config.exchangeId;
    case "manual":
      return validBase;
  }
};

const defaultTeams: Team[] = [
  { name: "Team 1", id: 1 },
  { name: "Team 2", id: 2 },
];

export const defaultManualConfig: ManualConfig = {
  mode: "manual",
  teams: defaultTeams,
  days: 5,
  difficulty: 2,
  duration: 5,
  running: false,
};

export const defaultInteractiveConfig = (
  exchangeId: string
): InteractiveConfig => ({
  exchangeId,
  mode: "interactive",
  teams: [],
  days: 5,
  difficulty: 2,
  duration: 2,
  running: false,
});

type ConfigContextType = [Config | null, (config: Config | null) => void];

const configContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(configContext);
  if (context === undefined) {
    throw new Error("");
  }
  return context;
};

export function ConfigContextProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Config | null>(null);

  return (
    <configContext.Provider value={[config, setConfig]}>
      {children}
    </configContext.Provider>
  );
}
