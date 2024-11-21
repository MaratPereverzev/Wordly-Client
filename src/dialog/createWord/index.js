import { styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Box } from "@components";
import { ActionsButtons } from "./actionsButtons";
import { WordInput } from "./wordInput";

export const CreateWordDialog = () => {
  const { id } = useParams();

  const form = useForm({
    defaultValues: {
      caption: undefined,
      description: undefined,
      dictionaryId: id,
    },
  });

  return (
    <StyledContainer flex column gap="20px">
      <WordInput form={form} />
      <ActionsButtons form={form} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)(() => ({
  width: "300px",
  padding: "8px",
}));
