import { Box } from "@components";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Page } from "../page";
import { useEffect } from "react";
import { setPageHash, getLocalStorageValue } from "@utils";

const Default = (props) => {
  useEffect(() => {
    setPageHash(getLocalStorageValue("page") ?? "home");
  }, []);

  return (
    <Box flex column gap grow sx={{ backgroundColor: "#ededed", p: 1 }}>
      <Header
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
        }}
      />
      <Box flex grow gap>
        <Sidebar
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
        <Page />
      </Box>
    </Box>
  );
};

export { Default as Dashboard };
