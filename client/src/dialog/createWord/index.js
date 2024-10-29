import { Box } from "@components";
import { Content } from "./content";
import { Actions } from "./actions";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const CreateWordDialog = () => {
  const { id } = useParams();

  const form = useForm({
    defaultValues: {
      caption: undefined,
      description: undefined,
      dictionaryId: id,
    },
    mode: "onChange",
  });

  return (
    <Box
      flex
      column
      sx={{
        width: "300px",
        p: 2,
      }}
      gap="20px"
    >
      <Content form={form} />
      <Actions form={form} />
    </Box>
  );
};
