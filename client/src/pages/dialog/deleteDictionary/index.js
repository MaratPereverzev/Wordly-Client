import { Box } from "@components";
import { Header } from "./header";
import { Content } from "./content";
import { Actions } from "./actions";
import { useEffect, useRef } from "react";
import { useDelDictionary } from "@fetch";
import { addEventListener } from "@utils";

const Default = (props) => {
  const { id } = props;
  const dictionaryData = useRef({ id });
  const { del } = useDelDictionary(dictionaryData.current);

  useEffect(
    () =>
      addEventListener("onDeleteDicitonary", () => {
        del();
      }),
    [del]
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

export { Default as DeleteDictionaryDialog };
