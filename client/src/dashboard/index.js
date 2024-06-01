import { Box } from "@components";
import { Header } from "./header";

const Default = (props) => {
  return (
    <Box flex column grow>
      <Header />
      <Box flex grow sx={{ border: "1px solid black" }}>
        <Box flex center column>
          dashboard navigation
        </Box>
        <Box flex grow={3} center sx={{ border: "1px solid black" }}>
          hello
        </Box>
      </Box>
    </Box>
  );
};

export { Default as Dashboard };
