import { styled } from "@mui/material";

import { Box } from "shared/ui";
import { Login as LoginWidget } from "widgets/Auth";

export const Login = () => {
  return (
    <StyledLoginContainer flex grow center>
      <LoginWidget />
    </StyledLoginContainer>
  );
};

const StyledLoginContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));