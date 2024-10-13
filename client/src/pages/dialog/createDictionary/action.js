import { Button, Box } from "@components";
import { dispatchEvent } from "@utils";
import { usePostDictionary } from "@fetch/useDictionaries";

const Default = ({ dictionaryData }) => {
  const { mutate } = usePostDictionary(dictionaryData.current);

  return (
    <Box flex jc="flex-end" gap>
      <Button
        color="success"
        caption="Create"
        sxText={{ px: 1 }}
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
          mutate();
        }}
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

export { Default as Action };
