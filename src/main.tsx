import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandle } from "./pages/ErrorHandle/ErrorHandle.jsx";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={ErrorHandle}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
