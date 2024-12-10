import { Box } from "shared/ui";
import { Content } from "./content";
import { Header } from "./header";
import { Action } from "./action";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export const CreateDictionaryDialogContent = () => {
  const dictionaryData = useRef({});
  const form = useForm({
    defaultValues: { name: undefined, description: undefined },
    mode: "onChange",
  });

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
      <Content dictionaryData={dictionaryData} form={form} />
      <Action dictionaryData={dictionaryData} form={form} />
    </Box>
  );
};
