import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <>tru</>,
  },
  {
    path: "/",
    element: <>ok</>,
    children: [
      { path: "dictionaries", element: <>ok</> },
      { path: "dictionaries/:id", element: <>ok</> },
      { path: "home", element: <>ok</> },
    ],
  },
]);
