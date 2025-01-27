import { RouterProvider } from "react-router-dom";

import { Snackbar } from "@/shared/ui";
import { router } from "../routing";

export const Dashboard = () => {
  return (
    <>
      <Snackbar />
      <RouterProvider router={router}/>
    </>
  );
};


