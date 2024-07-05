import { Button, IconButton, ButtonGroup } from "@mui/material";
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

const GroupButton = (props) => {
  const { sx, sxButton, ...other } = props;

  return (
    <ButtonGroup
      sx={{ ".MuiButtonGroup-grouped": { minWidth: "max-content" }, ...sx }}
      {...other}
    />
  );
};
export {
  Default as Button,
  ButtonIcon,
  MenuButtonTemplate,
  GroupButton as ButtonGroup,
};
