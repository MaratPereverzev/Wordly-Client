import { styled, useTheme } from "@mui/material";

import { useSidebarStore } from"@/app/store/sidebar";
import { useUserStore } from"@/app/store/user";
import { Box, Button, Divider, SidebarMenuButton } from"@/shared/ui";

export const Sidebar = () => {
  const logout = useUserStore(state => state.logout)

  const {changeIsOpen, open, route} = useSidebarStore(store => store);

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
        <SidebarMenuButton
          sxIcon={{
            rotate: route === "/settings" ? "70deg": "0deg",
            transition: "rotate 200ms ease-in-out"
          }}
          route="/settings"
          caption="settings" 
          icon="settings"
        />
        <SidebarMenuButton
          route="/login"
          icon="logout"
          caption="logout"
          onClick={logout}
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
