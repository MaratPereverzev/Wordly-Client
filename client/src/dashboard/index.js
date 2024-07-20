import { Box, Dialog, Snackbar } from "@components";
import { Sidebar } from "./sidebar";
import { Page } from "../page";
import { useEffect, useContext } from "react";
import {
  setPageHash,
  getLocalStorageValue,
  setLocalStorageValue,
  addEventListener,
} from "@utils";
import { useRender } from "@hooks";
import { UserContextData } from "@context";
import { Login } from "./auth";

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
  const user = useContext(UserContextData);

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
      {user?.isAuth === true ? <Default /> : <Login />}
    </>
  );
};

export { DefaultContext as Dashboard };
