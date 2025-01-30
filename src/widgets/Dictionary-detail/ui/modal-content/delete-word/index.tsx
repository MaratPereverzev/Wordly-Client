import { useDeleteWord } from "@/entities/Word";
import { Box, Button, Icon, Text } from "@/shared/ui";
import { styled } from "@mui/material";
import { dispatchEvent } from "@/shared/utils";

type DeleteWordDialogProps = {
  id: string
}

export const DeleteWordDialog = ({ id }: DeleteWordDialogProps) => {
  const { mutate } = useDeleteWord();

  const onClick = () => {
    mutate({id});
  };

  return (
    <Box
      flex
      column
      sx={{
        p: 2,
      }}
    >
      <Box center grow flex column sx={{ height: "120px" }}>
        <Icon
          icon="error"
          sx={{ 
            color: "red",
            fontSize: "70px",
          }}
        />
      </Box>
      <StyledContainer flex center column>
        <StyledText caption="Delete word" />
        <Text
          sx={{ color: ({ palette }) => palette.text.secondary }}
          caption="Are you sure you want to delete this word?"
        />
        <Text
          sx={{ color: ({ palette }) => palette.text.secondary }}
          caption="This action cannot be undone."
        />
      </StyledContainer>
      <Box flex jc="flex-end" gap sx={{ paddingTop: 4 }}>
        <Button
          color="error"
          caption="Delete"
          sxText={{ px: 1 }}
          onClick={() => {
            dispatchEvent("dialog/trigger", { opened: false });
            onClick();
          }}
        />
        <Button
          caption="Cancel"
          variant="text"
          sxText={{ px: 1 }}
          onClick={() => {
            dispatchEvent("dialog/trigger", { opened: false });
          }}
        />
      </Box>
    </Box>
  );
};

const StyledContainer = styled(Box)(() => ({
  padding: "8px",
  color: "#696969",
}));
const StyledText = styled(Text)(() => ({
  fontSize: "30px",
  paddingBottom: "4px",
}));

