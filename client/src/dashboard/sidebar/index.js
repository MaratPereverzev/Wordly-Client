import { Box, MenuButtonTemplate, Text, Divider } from "@components";
import {
  addEventListener,
  dispatchEvent,
  setPageHash,
  getLocalStorageValue,
  setLocalStorageValue,
  areEqual,
} from "@utils";
import { useRender } from "@hooks";
import { useEffect, useState, useCallback, memo } from "react";

const MenuButton = (props) => {
  const { sx, icon, name, open, caption, ...other } = props;

  let active = name === getLocalStorageValue("page");

  return (
    <MenuButtonTemplate
      color="inherit"
      variant={active ? "contained" : "text"}
      sx={{ gap: "5px", ...sx }}
      icon={icon}
      caption={open && <Text caption={caption} />}
      onClick={() => {
        dispatchEvent("onChangePage/sidebar", { hash: name });
        active = name === getLocalStorageValue("page");
      }}
      {...other}
    />
  );
};

const Default = memo((props) => {
  const { sx } = props;
  const [open, setOpen] = useState(
    getLocalStorageValue("sidebarOpen") ?? false
  );

  const handleOnClick = useCallback(() => {
    dispatchEvent("sidebarOpen");
  }, []);

  const setRender = useRender();

  useEffect(
    () =>
      addEventListener("sidebarOpen", () => {
        setOpen((prev) => !prev);
      }),
    []
  );

  useEffect(() =>
    addEventListener("closeSideBar", () => {
      setOpen(false);
    })
  );

  useEffect(
    () =>
      addEventListener("onChangePage/sidebar", ({ detail }) => {
        setLocalStorageValue("page", detail.hash);
        setPageHash(detail.hash);
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
        <MenuButton name="home" caption="home" icon="home" open={open} />
        <MenuButton
          name="dictionaries"
          caption="dictionaries"
          icon="dictionary"
          open={open}
        />
        <MenuButton name="words" caption="words" icon="word" open={open} />
        <MenuButton name="saved" caption="saved" icon="saved" open={open} />
      </Box>
      <Box flex column sx={{ p: 1 }}>
        <MenuButton
          icon="profile"
          name="account"
          open={open}
          caption="profile"
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
          onClick={handleOnClick}
        />
      </Box>
    </Box>
  );
}, areEqual);

export { Default as Sidebar };
