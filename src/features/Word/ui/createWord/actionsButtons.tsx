import { Box, Button } from "shared/ui";
import {usePostWord} from "entities/Word/hooks"
import { dispatchEvent } from "shared/utils";
import { useParams } from "react-router-dom";

export const ActionsButtons = ({ form: { handleSubmit, getValues } }) => {
  const id = useParams();
  const { mutate } = usePostWord(String(id));

  const onSubmit = () => {
    mutate(getValues());
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
