import { Box } from "@components";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Page } from "../page";

const Default = (props) => {
  return (
    <Box flex column grow>
      <Header />
      <Box flex grow sx={{ border: "1px solid black" }}>
        <Sidebar />
        <Page />
      </Box>
    </Box>
  );
};

export { Default as Dashboard };
