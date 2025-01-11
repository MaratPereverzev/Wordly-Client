import { useParams } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

import { Box, Button } from"@/shared/ui";
import {usePostWord} from"@/entities/Word/hooks"
import { dispatchEvent } from"@/shared/utils";
import { WordPostParams } from"@/shared/api/word/model";

type ActionsButtonsProps = {
  form: UseFormReturn<Partial<WordPostParams>, any, undefined>
}

export const ActionsButtons = ({ form: { handleSubmit, getValues } }: ActionsButtonsProps) => {
  const id = useParams();
  const { mutate } = usePostWord(String(id));

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
