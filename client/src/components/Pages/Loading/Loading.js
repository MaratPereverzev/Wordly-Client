import "./style.css";
import { Box } from "@components/Box";
import { styled } from "@mui/material";

export const Loading = (props) => {
  return (
    <StyledContainer flex center>
      <Box className="spinner" />
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)(() => ({ width: "100%", height: "100%" }));
