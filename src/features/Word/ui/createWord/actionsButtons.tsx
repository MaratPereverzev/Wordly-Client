import { UseFormReturn } from "react-hook-form";

import { usePostWord } from "@/entities/Word/hooks";
import { WordPostParams } from "@/shared/api/word/model";
import { Box, Button } from "@/shared/ui";
import { dispatchEvent } from "@/shared/utils";

type ActionsButtonsProps = {
  form: UseFormReturn<Partial<WordPostParams>, any, undefined>
}

export const ActionsButtons = ({ form: { handleSubmit, getValues } }: ActionsButtonsProps) => {
  const { mutate } = usePostWord();

  const onSubmit = () => {
    mutate(getValues() as WordPostParams);
  };

  return (
    <Box flex jc="flex-end" gap>
      <Button caption="Add" color="success" onClick={handleSubmit(onSubmit)} />
      <Button
        caption="Cancel"
        variant="text"
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
        }}
      />
    </Box>
  );
};
