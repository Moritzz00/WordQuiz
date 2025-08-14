import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App";
import { BrowserRouter } from "react-router";


const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter basename="/WordQuiz">
      <App />
    </BrowserRouter>
  </StrictMode>
);