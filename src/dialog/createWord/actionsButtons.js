import { Box, Button } from "@components";
import { usePostWords } from "@fetch/useWords";
import { dispatchEvent } from "@utils";

export const ActionsButtons = ({ form: { handleSubmit, getValues } }) => {
  const { mutate } = usePostWords();

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
