import { Button, IconButton } from "@mui/material";
import { Icon } from "../icon";
import { Text } from "../text";

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
        p: 0.5,
        justifyContent: "flex-start",
        minWidth: "min-content",
        textTransform: "capitalize",
        ...sx,
      }}
      variant={variant}
      {...other}
    >
      {icon && <Icon icon={icon} sx={{ ...sxIcon }} />}
      {captionIsString ? (
        <Text caption={caption} sx={{ ...sxText }} />
      ) : (
        caption
      )}
      {other.children}
    </Button>
  );
};

const MenuButtonTemplate = (props) => {
  const { sx, name, variant, ...other } = props;

  return (
    <Default
      variant={variant}
      sx={{
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
