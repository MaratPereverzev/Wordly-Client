import { Box, MenuButtonTemplate, Icon, Typography } from "@components";
import { addEventListener, dispatchEvent, getPageHash } from "@utils";
import { useEffect, useState } from "react";

const MenuButton = (props) => {
  const { sx, icon, name, iconSx, open, caption, ...other } = props;
  let active = name === getPageHash();

  return (
    <MenuButtonTemplate
      color="inherit"
      variant={active ? "contained" : "text"}
      caption={
        <>
          <Icon icon={icon} />
          {open && <Typography caption={caption} />}
        </>
      }
      onClick={() => {
        dispatchEvent("onChangePage", { hash: name });
        active = name === getPageHash();
      }}
      {...other}
    />
  );
};

const Default = (props) => {
  const { sx } = props;
  const [open, setOpen] = useState(true);
  const [, setRender] = useState(true);

  useEffect(
    () =>
      addEventListener("sidebarOpen", () => {
        setOpen((prev) => !prev);
      }),
    []
  );

  useEffect(
    () =>
      addEventListener("onChangePage", ({ detail }) => {
        setRender((prev) => !prev);
        window.location.hash = detail.hash;
      }),
    []
  );

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
        <MenuButton
          name="dictionaries"
          caption="Dictionaries"
          icon="dictionary"
          open={open}
        />
        <MenuButton
          name="hello"
          caption="hello"
          icon={"dictionary"}
          open={open}
        />
      </Box>
      <Box flex column sx={{ p: 1 }}>
        <MenuButton
          name="hello1"
          sx={{ gap: "10px" }}
          icon="dictionary"
          caption="hello"
          open={open}
        />
      </Box>
    </Box>
  );
};

export { Default as Sidebar };
