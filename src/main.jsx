import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css"; // Import de Bootstrap
import App from "./App.jsx";
import "./assets/styles/_styles.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
