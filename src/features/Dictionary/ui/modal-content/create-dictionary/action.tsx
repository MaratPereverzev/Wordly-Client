import { Button, Box } from "shared/ui";
import { dispatchEvent } from "shared/utils";
import { usePostDictionary } from "entities/Dictionary/hooks";
import { useParams } from "react-router-dom";

export const Action = ({ dictionaryData, form }) => {
  const id = useParams()
  const { mutate } = usePostDictionary(String(id));

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
