import { styled } from "@mui/material";

import { LoginSubmitForm } from "@/features/auth/ui/submit";
import { Box, Text } from "@/shared/ui";

export const Login = () => {
  return <StyledContentContainer flex column center>
  <Box flex column gap="30px" sx={{ height: "50%" }}>
    <Box flex center>
      <img
        src="/res/icons/WordlyDark.png"
        alt="icon"
        style={{ width: "60px" }}
      />
      <Text caption="ordly" sx={{ fontSize: "50px" }} />
    </Box>
    <LoginSubmitForm />
  </Box>
</StyledContentContainer>
}


const StyledContentContainer = styled(Box)(({theme}) => ({
  backdropFilter: "blur(4px)",
  width: "40%",
  height: "60%",
  border:`1px solid ${theme.palette.divider}`,
  borderRadius: 2,
}));
