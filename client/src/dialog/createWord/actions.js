import { Box, Button } from "@components";
import { dispatchEvent } from "@utils";
import { usePostWords } from "@fetch/useWords";

export const Actions = ({ form }) => {
  const { handleSubmit } = form;

  const { mutate } = usePostWords();

  const onSubmit = () => {
    mutate(form.getValues());
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
