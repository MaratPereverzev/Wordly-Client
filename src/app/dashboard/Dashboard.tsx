import { styled } from "@mui/material";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login, Outlet } from "pages";
import { Box, Dialog, Snackbar } from "shared/ui";
import { Sidebar } from "./Sidebar";

const LazyDictionaries = lazy(() => import("pages/dictionary-list"));
const LazyDictionary = lazy(() => import("pages/dictionary"));

const DashboardSkeleton = () => {
  return (
    <StyledDashboardSkeletonContainer flex gap grow>
      <Dialog />
      <Sidebar />
      <Outlet />
    </StyledDashboardSkeletonContainer>
  );
};

//лейзи и без листенера и 10 модалчк

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

export const Dashboard = () => {
  return (
    <>
      <Snackbar />
      <RouterProvider router={router}/>
    </>
  );
};

const StyledDashboardSkeletonContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: "8px",
  overflow: "hidden",
}));
