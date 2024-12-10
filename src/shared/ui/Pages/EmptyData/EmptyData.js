import { Box } from "@components/Box";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import { styled } from "@mui/material";

export const EmptyData = () => {
  return (
    <StyledContainer flex grow center column>
      <StyledIcon icon="empty" />
      <StyledText caption="It seems, you don't have any dictionary yet" />
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)(() => ({ color: "grey" }));

const StyledIcon = styled(Icon)(() => ({ ".span": { fontSize: "70px" } }));

const StyledText = styled(Text)(() => ({ fontSize: "25px" }));
