import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";
import { store, loadStateFromLocalStorage } from "./store/store";

// Load persisted state before rendering
const persistedState = loadStateFromLocalStorage();
if (persistedState) {
  // Dispatch action to restore state if needed
  // For now, the store will automatically load from the preloadedState
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* 🔔 TOAST CONTAINER (ONLY ONCE) */}
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
