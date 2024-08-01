import { useConfig } from "./ConfigContext";
import { Stock } from "./manual-mode";

export default function Game() {
  const [config] = useConfig();
  if (!config) throw new Error("Config must be set to start game");
  if (!config.running) throw new Error("Game must be running to render game");
  if (config.mode !== "manual") return;

  return (
    <div id="game">
      <div id="teams-panel">
        <h1 className="panel-title">TEAMS</h1>
        {config.teams.map((t) => (
          <div className="team">
            <h2>{t.name}</h2>
          </div>
        ))}
      </div>
      <div id="graphs-panel">
        <h1 className="panel-title">STOCKS</h1>
        {["AAPL", "MSFT", "GOOG"].map((s) => (
          <StockGraph stock={new Stock(s, s)} />
        ))}
      </div>
    </div>
  );
}

function StockGraph({ stock }: { stock: Stock }) {
  return (
    <div className="stock-graph">
      <div className="stock-header">
        <div>{stock.name}</div>
        <div>£{stock.currentPrice()}</div>
      </div>
      <div>Graph</div>
    </div>
  );
}
