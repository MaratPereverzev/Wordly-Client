import { lazy } from "react";
import { JSX } from "react";
import { Box, Dialog, Snackbar } from "components";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Page } from "../pages";
import { Login } from "./auth";
import { Sidebar } from "./sidebar";
import { styled } from "@mui/material";

const LazyDictionaries = lazy(() => import("pages/dictionaries"));
const LazyDictionary = lazy(() => import("pages/dictionary"));

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
      { path: "dictionaries", element: <LazyDictionaries /> },
      { path: "dictionaries/:id", element: <LazyDictionary /> },
      { path: "home", element: <div>home</div> },
    ],
  },
]);

export const Dashboard = (): JSX.Element => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Snackbar />
      {user?.accessToken !== "" ? <DashboardSkeleton /> : <Login />}
      <RouterProvider router={router}/>
    </>
  );
};

const StyledDashboardSkeletonContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: "8px",
  overflow: "hidden",
}));
