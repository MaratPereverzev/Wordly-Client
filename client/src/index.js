import React from "react";
import ReactDOM from "react-dom/client";
import { Dashboard } from "./dashboard";
import { store } from "@store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dictionaries } from "./pages/dictionaries";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({});

const router = createBrowserRouter([
  {
    path: "/dictionaries",
    errorElement: <div>404 not found</div>,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <Dashboard />
        </RouterProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
