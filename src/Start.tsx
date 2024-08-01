import {
  defaultInteractiveConfig,
  defaultManualConfig,
  useConfig,
} from "./ConfigContext";

export default function Start() {
  const [, setConfig] = useConfig();

  return (
    <div id="main-container">
      <div id="main">
        <div>
          <h1 id="start-title">Battle Stocks</h1>
          <p id="start-p">Choose a game mode to start</p>
        </div>
        <div id="mode-picker">
          <button
            onClick={() => {
              // TODO: Make fetch request for the exchange id
              setConfig(defaultInteractiveConfig("A5H 8W2"));
            }}
          >
            <h2>Interactive</h2>
            <p>Trade stocks in real time</p>
          </button>
          <button onClick={() => setConfig(defaultManualConfig)}>
            <h2>Manual</h2>
            <p>Buy and sell stocks after every day</p>
          </button>

          {/* <button
              onClick={() => setMode("individual")}
              className={`${mode === "individual" && "selected-mode"}`}
            >
              <h2>Individual</h2>
              <p>Play individually to maximise profit</p>
            </button> */}
        </div>
      </div>
    </div>
  );
}
