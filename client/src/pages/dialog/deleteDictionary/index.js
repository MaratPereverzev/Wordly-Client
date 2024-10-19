import { Box } from "@components";
import { useDelDictionary } from "@fetch";
import { addEventListener } from "@utils";
import { useEffect } from "react";
import { Actions } from "./actions";
import { Content } from "./content";
import { Header } from "./header";

export const DeleteDictionaryDialog = (props) => {
  const { id } = props;
  const { mutate } = useDelDictionary({ id });

  useEffect(
    () =>
      addEventListener("onDeleteDicitonary", () => {
        mutate();
      }),
    [mutate]
  );

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
      <Actions />
    </Box>
  );
};
