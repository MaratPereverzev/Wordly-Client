import { Box, Dialog, Snackbar } from "@components";
import { useRender } from "@hooks";
import {
  addEventListener,
  getLocalStorageValue,
  setLocalStorageValue,
  setPageHash,
} from "@utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Page } from "../pages";
import { Login } from "./auth";
import { Sidebar } from "./sidebar";

const Default = (props) => {
  useEffect(() => {
    setPageHash(getLocalStorageValue("page") ?? "home", true);
  }, []);

  return (
    <Box
      flex
      gap
      grow
      sx={{ backgroundColor: "#ededed", p: 1, overflow: "hidden" }}
    >
      <Dialog />
      <Sidebar
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
        }}
      />
      <Page />
    </Box>
  );
};

const DefaultContext = (props) => {
  const { user } = useSelector((state) => state.user);

  const setRender = useRender();

  useEffect(
    () =>
      addEventListener("onLogin", ({ detail }) => {
        if (detail?.toLocalStorage === true)
          setLocalStorageValue("isAuth", detail.isAuth);
        setRender();
      }),
    [setRender]
  );

  return (
    <>
      <Snackbar />
      {user?.accessToken ? <Default /> : <Login />}
    </>
  );
};

export { DefaultContext as Dashboard };
