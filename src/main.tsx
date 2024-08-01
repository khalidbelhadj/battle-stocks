import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigContextProvider } from "./ConfigContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigContextProvider>
      <App />
    </ConfigContextProvider>
  </React.StrictMode>
);
