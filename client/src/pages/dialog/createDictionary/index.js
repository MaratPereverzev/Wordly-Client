import { Box } from "@components";
import { Content } from "./content";
import { Header } from "./header";
import { Action } from "./action";

const Default = (props) => {
  return (
    <Box
      flex
      column
      sx={{
        height: "700px",
        width: "500px",
        p: 2,
      }}
    >
      <Header />
      <Content />
      <Action />
    </Box>
  );
};

export { Default as CreateDictionaryDialogContent };
