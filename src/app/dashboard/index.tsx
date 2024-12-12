import { styled } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { JSX, lazy } from "react";

import { Login } from "@/auth";
import { Page } from "@/pages";
import { useAppSelector } from "@/shared/hooks/useSelector";
import { Box, Dialog, Snackbar } from "@/shared/ui";
import { Sidebar } from "./Sidebar";

const LazyDictionaries = lazy(() => import("@/pages/dictionary-list"));
const LazyDictionary = lazy(() => import("@/pages/dictionary"));

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
  const user = useAppSelector((state) => state.userReducer);

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
