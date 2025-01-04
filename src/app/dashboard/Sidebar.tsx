import { styled, useTheme } from "@mui/material";

import { useSidebarStore } from "app/store/sidebar";
import { useUserStore } from "app/store/user";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, SidebarMenuButton } from "shared/ui";
import { dispatchEvent } from "shared/utils";

export const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const logout = useUserStore(state => state.logout)

  const {changeIsOpen, open} = useSidebarStore(store => store);

  return (
    <StyledSidebarMainContainer
      flex
      column
      sx={{ width: open ? "180px" : "48px" }}
    >
      <StyledSidebarButtonContainer flex grow gap column>
        <SidebarMenuButton route="/home" caption="home" icon="home" />
        <SidebarMenuButton
          route="/dictionaries"
          caption="dictionaries"
          icon="dictionary"
        />
      </StyledSidebarButtonContainer>
      <StyledSidebarButtonContainer flex column gap>
        <Button
          onClick={() => dispatchEvent("changeTheme")}
          sx={{ gap: "5px" }}
          variant="text"
          caption={open && "Switch"}
          icon={theme.palette.mode === "light" ? "dark_mode" : "light_mode"}
        />
        <SidebarMenuButton
          route="/login"
          icon="logout"
          caption="logout"
          onClick={() => {
            logout();
            navigate("/login")
          }}
        />
      </StyledSidebarButtonContainer>
      <StyledSidebarButtonContainer flex gap="5px" column>
        <Divider />
        <Button
          variant="text"
          color="inherit"
          sx={{ gap: "5px" }}
          sxIcon={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 200ms ease-in-out",
          }}
          icon="expand"
          onClick={() => {
            changeIsOpen(!open);
          }}
          caption={open && "close"}
        />
      </StyledSidebarButtonContainer>
    </StyledSidebarMainContainer>
  );
};

const StyledSidebarButtonContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  color: theme.palette.text.primary,
}));
const StyledSidebarMainContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "8px",
  transition: "width 100ms ease-in-out",
}));
