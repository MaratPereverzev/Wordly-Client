import { Box } from "shared/ui";
import { Content } from "./content";
import { Header } from "./header";
import { Action } from "./action";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { DictionaryPostParams } from "shared/api/dictionary/model";

const defaultValues: Partial<DictionaryPostParams> = { caption: undefined, description: undefined }

export const CreateDictionaryDialogContent = () => {
  const dictionaryData = useRef<typeof defaultValues>(defaultValues);
  const form = useForm({
    defaultValues,
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
