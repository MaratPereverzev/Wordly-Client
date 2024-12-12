import { styled } from "@mui/material";

import { Box } from "@/shared/ui/Box";
import { Icon } from "@/shared/ui/Icon";
import { Text } from "@/shared/ui/Text";

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
