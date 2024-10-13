import { Box } from "@components";
import { Content } from "./content";
import { Header } from "./header";
import { Action } from "./action";
import { useRef } from "react";

const Default = (props) => {
  const dictionaryData = useRef({});

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
      <Header dictionaryData={dictionaryData} />
      <Content dictionaryData={dictionaryData} />
      <Action dictionaryData={dictionaryData} />
    </Box>
  );
};

export { Default as CreateDictionaryDialogContent };
