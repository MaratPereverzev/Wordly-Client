import { Button, IconButton } from "@mui/material";
import { Icon } from "../icon";
import { Typography } from "../typography";

const Default = (props) => {
  const {
    sx = {},
    sxIcon = {},
    sxText = {},
    icon,
    caption,
    variant = "contained",
    ...other
  } = props;

  const captionIsString = typeof caption === "string";
  return (
    <Button
      size="small"
      sx={{
        m: 0,
        p: 0.5,
        minWidth: 0,
        textTransform: "capitalize",
        color: "inherit",
        ...sx,
      }}
      variant={variant}
      {...other}
    >
      {icon && <Icon icon={icon} sx={{ ...sxIcon }} />}
      {captionIsString ? (
        <Typography caption={caption} sx={{ ...sxText }} />
      ) : (
        caption
      )}
      {other.children}
    </Button>
  );
};

const MenuButtonTemplate = (props) => {
  const { sx, name, active, ...other } = props;

  return (
    <Default
      variant={active ? "contained" : "text"}
      sx={{
        justifyContent: "flex-start",
        ...sx,
      }}
      {...other}
    />
  );
};

const ButtonIcon = (props) => {
  const { sx, sxIcon, icon, ...other } = props;
  return (
    <IconButton variant="text" sx={{ color: "inherit", ...sx }} {...other}>
      <Icon icon={icon} sx={{ ...sxIcon }} />
    </IconButton>
  );
};
export { Default as Button, ButtonIcon, MenuButtonTemplate };
