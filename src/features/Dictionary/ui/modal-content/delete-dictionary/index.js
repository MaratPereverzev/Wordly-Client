import { Box } from "shared/ui";
import { Actions } from "./actions";
import { Content } from "./content";
import { Header } from "./header";

export const DeleteDictionaryDialog = ({ id }) => {
  return (
    <Box
      flex
      column
      sx={{
        p: 2,
      }}
    >
      <Header />
      <Content />
      <Actions id={id} />
    </Box>
  );
};
