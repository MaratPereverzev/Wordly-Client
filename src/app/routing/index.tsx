import { createBrowserRouter } from "react-router-dom";
import { styled } from "@mui/material";
import { lazy } from "react";

import { Login, Outlet } from "@/pages";
import { Box, Dialog } from "@/shared/ui";
import { Sidebar } from "../dashboard";

const LazySettings = lazy(() => import("@/pages/settings"))
const LazyDictionaries = lazy(() => import("@/pages/dictionary"));
const LazyDictionary = lazy(() => import("@/pages/dictionary-detail"));

const DashboardSkeleton = () => {
  return (
    <StyledDashboardSkeletonContainer flex gap grow>
      <Dialog />
      <Sidebar />
      <Outlet />
    </StyledDashboardSkeletonContainer>
  );
};

export const router = createBrowserRouter([
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
      { path: "settings", element: <LazySettings />}
    ],
  },
]);

const StyledDashboardSkeletonContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: "8px",
  overflow: "hidden",
}));
