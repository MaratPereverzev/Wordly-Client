import React from "react";
import ReactDOM from "react-dom/client";
import { Dashboard } from "./dashboard";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </React.StrictMode>
);
