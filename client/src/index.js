import { UserContext } from "@context";
import React from "react";
import ReactDOM from "react-dom/client";
import { Dashboard } from "./dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserContext>
      <Dashboard />
    </UserContext>
  </React.StrictMode>
);
