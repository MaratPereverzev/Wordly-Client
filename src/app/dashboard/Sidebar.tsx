import { styled, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";

import { useSidebarStore } from "app/store/sidebar";
import { loginAction } from "app/store/user";
import { Box, Button, Divider, SidebarMenuButton } from "shared/ui";
import { dispatchEvent } from "shared/utils";

export const Sidebar = () => {
  const theme = useTheme();

  const {changeIsOpen, open} = useSidebarStore(store => store);

  const dispatch = useDispatch();

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
            dispatch(loginAction({ accessToken: "" }));
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
