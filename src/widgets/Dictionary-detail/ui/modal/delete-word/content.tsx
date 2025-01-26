import { styled } from "@mui/material";

import { Box, Text } from"@/shared/ui";

export const Content = () => {
  return (
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
