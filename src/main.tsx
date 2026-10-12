import "./styles.css";
import { MotionConfig } from "motion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const element = (
  <React.StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </React.StrictMode>
);
const root = document.getElementById("root")!;
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, element);
else ReactDOM.createRoot(root).render(element);
