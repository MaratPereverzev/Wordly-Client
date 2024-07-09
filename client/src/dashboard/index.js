import { Box, Dialog } from "@components";
import { Sidebar } from "./sidebar";
import { Page } from "../page";
import { useEffect } from "react";
import { setPageHash, getLocalStorageValue } from "@utils";

const Default = (props) => {
  useEffect(() => {
    setPageHash(getLocalStorageValue("page") ?? "home");
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

export { Default as Dashboard };
