import { Box, MenuButtonTemplate, Divider } from "@components";
import {
  addEventListener,
  dispatchEvent,
  setPageHash,
  getLocalStorageValue,
  setLocalStorageValue,
} from "@utils";
import { UserContextData } from "@context";
import { useRender } from "@hooks";
import { useEffect, useState, useContext } from "react";

const MenuButton = (props) => {
  const { sx, icon, route, open, caption, ...other } = props;

  let active = route === (getLocalStorageValue("page") ?? "home");

  return (
    <MenuButtonTemplate
      color="inherit"
      variant={active ? "contained" : "text"}
      sx={{ gap: "5px", ...sx }}
      icon={icon}
      caption={open && caption}
      onClick={() => {
        dispatchEvent("onChangePage/sidebar", { hash: route });
        active = route === getLocalStorageValue("page");
      }}
      {...other}
    />
  );
};

const Default = (props) => {
  const { sx } = props;

  const user = useContext(UserContextData);

  const [open, setOpen] = useState(
    () => getLocalStorageValue("sidebarOpen") ?? false
  );

  const setRender = useRender();

  useEffect(
    () =>
      addEventListener("sidebar", ({ detail }) => {
        if (detail?.closed === true) setOpen(false);
        else setOpen((prev) => !prev);
      }),
    []
  );

  useEffect(
    () =>
      addEventListener("onChangePage/sidebar", ({ detail }) => {
        setPageHash(detail.hash, true);
        dispatchEvent("sidebar", { closed: true });
        setRender();
      }),
    [setRender]
  );

  useEffect(() => {
    setLocalStorageValue("sidebarOpen", open);
  }, [open]);

  return (
    <Box
      flex
      column
      sx={{
        width: open ? "180px" : "48px",
        transition: "width 100ms ease-in-out",
        ...sx,
      }}
    >
      <Box flex grow gap column sx={{ p: 1 }}>
        <MenuButton route="home" caption="home" icon="home" open={open} />
        <MenuButton
          route="dictionaries"
          caption="dictionaries"
          icon="dictionary"
          open={open}
        />
        <MenuButton route="words" caption="words" icon="word" open={open} />
        <MenuButton route="saved" caption="saved" icon="saved" open={open} />
      </Box>
      <Box flex column sx={{ p: 1 }}>
        <MenuButton
          icon="logout"
          open={open}
          caption="logout"
          onClick={() => {
            user.isAuth = false;
            dispatchEvent("onLogin");
          }}
        />
      </Box>
      <Box flex gap="5px" column sx={{ p: 1 }}>
        <Divider />
        <MenuButton
          sxIcon={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 200ms ease-in-out",
          }}
          icon="open"
          caption="close"
          open={open}
          onClick={() => {
            dispatchEvent("sidebar");
          }}
        />
      </Box>
    </Box>
  );
};

export { Default as Sidebar };
