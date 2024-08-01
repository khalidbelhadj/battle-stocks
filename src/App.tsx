import SetupInteractive from "./SetupInteractive";
import SetupManual from "./SetupManual";
import { useConfig } from "./ConfigContext";
import Game from "./Game";
import Start from "./Start";

export default function App() {
  const [config] = useConfig();

  if (config === null) return <Start />;
  if (config.running) return <Game />;

  switch (config.mode) {
    case "interactive":
      return <SetupInteractive />;
    case "manual":
      return <SetupManual />;
  }
}
