import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";

const rootElment = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElment);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
