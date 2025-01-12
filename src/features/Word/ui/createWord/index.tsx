import { styled } from "@mui/material";
import { useForm } from "react-hook-form";

import { WordPostParams } from"@/shared/api/word/model";
import { Box } from"@/shared/ui";
import { ActionsButtons } from "./actionsButtons";
import { WordInput } from "./wordInput";

const defaultValues: Partial<WordPostParams> = { caption: undefined, description: undefined }

export const CreateWordDialog = () => {
  const form = useForm<typeof defaultValues>({
    defaultValues,
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
