import { Box, Dialog, Snackbar } from "@components";
import { Dictionaries } from "@pages/dictionaries";
import { Dictionary } from "@pages/dictionaries/dictionary";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Page } from "../pages";
import { Login } from "./auth";
import { Sidebar } from "./sidebar";
import { styled } from "@mui/material";

const DashboardSkeleton = () => {
  return (
    <StyledDashboardSkeletonContainer flex gap grow>
      <Dialog />
      <Sidebar />
      <Page />
    </StyledDashboardSkeletonContainer>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <DashboardSkeleton />,
    children: [
      { path: "dictionaries", element: <Dictionaries /> },
      { path: "dictionaries/:id", element: <Dictionary /> },
      { path: "home", element: <div>home</div> },
    ],
  },
]);

export const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Snackbar />
      <RouterProvider router={router}>
        {user?.accessToken !== "" ? <DashboardSkeleton /> : <Login />}
      </RouterProvider>
    </>
  );
};

const StyledDashboardSkeletonContainer = styled(Box)(() => ({
  backgroundColor: "#ededed",
  padding: "8px",
  overflow: "hidden",
}));
