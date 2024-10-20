import { Box, Button, Divider, SidebarMenuButton } from "@components";
import { loginAction } from "@store/user";
import { useDispatch, useSelector } from "react-redux";
import { changeOpenState } from "@store/sidebar";
import { styled } from "@mui/material";

export const Sidebar = () => {
  const sidebar = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();

  return (
    <StyledSidebarMainContainer
      flex
      column
      sx={{ width: sidebar.open ? "180px" : "48px" }}
    >
      <StyledSidebarButtonContainer flex grow gap column>
        <SidebarMenuButton route="/home" caption="home" icon="home" />
        <SidebarMenuButton
          route="/dictionaries"
          caption="dictionaries"
          icon="dictionary"
        />
        <SidebarMenuButton route="/words" caption="words" icon="translation" />
        <SidebarMenuButton route="/saved" caption="saved" icon="saved" />
      </StyledSidebarButtonContainer>
      <StyledSidebarButtonContainer flex column>
        <SidebarMenuButton
          route="/login"
          icon="logout"
          caption="logout"
          onClick={() => {
            dispatch(loginAction({ accessToken: "" }));

            return true;
          }}
        />
      </StyledSidebarButtonContainer>
      <StyledSidebarButtonContainer flex gap="5px" column>
        <Divider />
        <Button
          variant="text"
          color="inherit"
          sxIcon={{
            transform: sidebar.open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 200ms ease-in-out",
          }}
          icon="expand"
          open={sidebar.open}
          onClick={() => {
            dispatch(changeOpenState({ open: !sidebar.open }));
          }}
          caption={sidebar.open && "close"}
        />
      </StyledSidebarButtonContainer>
    </StyledSidebarMainContainer>
  );
};

const StyledSidebarButtonContainer = styled(Box)(() => ({ padding: "8px" }));
const StyledSidebarMainContainer = styled(Box)(() => ({
  backgroundColor: "white",
  borderRadius: "8px",
  transition: "width 100ms ease-in-out",
}));
