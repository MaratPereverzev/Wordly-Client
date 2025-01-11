import { styled } from "@mui/material";

import "./style.css";
import { Box } from"@/shared/ui";

export const Loading = () => {
  return (
    <StyledContainer flex center>
      <Box className="spinner" />
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)(() => ({ width: "100%", height: "100%" }));
