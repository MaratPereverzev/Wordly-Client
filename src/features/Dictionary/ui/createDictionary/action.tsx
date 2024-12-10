import { Button, Box } from "@components";
import { dispatchEvent } from "@utils";
import { usePostDictionary } from "@fetch/useDictionaries";

export const Action = ({ dictionaryData, form }) => {
  const { mutate } = usePostDictionary();

  const { handleSubmit } = form;

  const onSubmit = () => {
    dispatchEvent("dialogTrigger", { opened: false });
    mutate(dictionaryData.current);
  };

  return (
    <Box flex jc="flex-end" gap>
      <Button
        color="success"
        caption="Create"
        sxText={{ px: 1 }}
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        variant="text"
        caption="Cancel"
        sxText={{ px: 1 }}
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
        }}
      />
    </Box>
  );
};
