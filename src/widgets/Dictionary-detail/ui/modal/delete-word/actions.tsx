import { useDeleteWord } from "@/entities/Word";
import { Box, Button } from "@/shared/ui";
import { dispatchEvent } from "@/shared/utils";

type ActionsProps ={
  id: string
}

export const Actions = ({id}: ActionsProps) => {
  const { mutate } = useDeleteWord();

  const onClick = () => {
    mutate({id});
  };

  return (
    <Box flex jc="flex-end" gap sx={{ paddingTop: 4 }}>
      <Button
        color="error"
        caption="Delete"
        sxText={{ px: 1 }}
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
          onClick();
        }}
      />
      <Button
        caption="Cancel"
        variant="text"
        sxText={{ px: 1 }}
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
        }}
      />
    </Box>
  );
};
