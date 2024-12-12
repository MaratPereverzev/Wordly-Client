import { createBrowserRouter } from "react-router-dom";

import DictionaryDetail from "@/pages/dictionary";
import DictionaryList from "@/pages/dictionary-list";
import { Dashboard } from "../dashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <>ok</>,
    children: [
      { path: "dictionaries", element: <DictionaryList /> },
      { path: "dictionaries/:id", element: <DictionaryDetail /> },
      { path: "home", element: <>ok</> },
    ],
  },
]);
