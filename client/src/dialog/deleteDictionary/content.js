import { Box, Text } from "@components";
import { styled } from "@mui/material";

export const Content = () => {
  return (
    <StyledContainer flex center column>
      <StyledText caption="Delete dictionary" />
      <Text caption="Are you sure you want to delete this dictionary?" />
      <Text caption="This action cannot be undone." />
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
  color: "black",
}));
