import { Box, Button, Divider, SidebarMenuButton } from "@components";
import { loginAction } from "@store/user";
import { useDispatch, useSelector } from "react-redux";
import { changeOpenState } from "@store/sidebar";

export const Sidebar = (props) => {
  const { sx } = props;
  const sidebar = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();

  return (
    <Box
      flex
      column
      sx={{
        width: sidebar.open ? "180px" : "48px",
        transition: "width 100ms ease-in-out",
        ...sx,
      }}
    >
      <Box flex grow gap column sx={{ p: 1 }}>
        <SidebarMenuButton route="/home" caption="home" icon="home" />
        <SidebarMenuButton
          route="/dictionaries"
          caption="dictionaries"
          icon="dictionary"
        />
        <SidebarMenuButton route="/words" caption="words" icon="word" />
        <SidebarMenuButton route="/saved" caption="saved" icon="saved" />
      </Box>
      <Box flex column sx={{ p: 1 }}>
        <SidebarMenuButton
          route="/login"
          icon="logout"
          caption="logout"
          onClick={() => {
            dispatch(loginAction({ accessToken: "" }));

            return true;
          }}
        />
      </Box>
      <Box flex gap="5px" column sx={{ p: 1 }}>
        <Divider />
        <Button
          variant="text"
          color="inherit"
          sxIcon={{
            transform: sidebar.open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 200ms ease-in-out",
          }}
          icon="open"
          open={sidebar.open}
          onClick={() => {
            dispatch(changeOpenState({ open: !sidebar.open }));
          }}
          caption={sidebar.open && "close"}
        />
      </Box>
    </Box>
  );
};
