import { styled } from "@mui/material";

import { Box } from"@/shared/ui/Box";
import { Icon, IconListKeys } from"@/shared/ui/Icon";
import { Text } from"@/shared/ui/Text";

type EmptyDataProps = {
  icon: IconListKeys,
  message: string
}
export const EmptyData = ({icon, message}: EmptyDataProps) => {
  return (
    <StyledContainer flex grow center column>
      <StyledIcon icon={icon ?? "empty"} />
      <StyledText caption={message ?? "It seems, you don't have any dictionary yet"} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)(() => ({ color: "grey" }));

const StyledIcon = styled(Icon)(() => ({ ".span": { fontSize: "70px" } }));

const StyledText = styled(Text)(() => ({ fontSize: "25px" }));
