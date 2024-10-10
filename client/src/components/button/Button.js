import {
  ButtonGroup as ButtonGroupMui,
  Button as ButtonMui,
  IconButton,
} from "@mui/material";
import { areEqual } from "@utils";
import { memo } from "react";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";

export const Button = memo((props) => {
  const {
    sx = {},
    sxIcon = {},
    sxText = {},
    icon,
    caption,
    variant = "contained",
    iconAtTheEnd,
    tooltipPosition,
    ...other
  } = props;

  const captionIsString = typeof caption === "string";

  if (!!tooltipPosition && !caption) {
    return (
      <Tooltip disableInteractive title={icon} placement={tooltipPosition}>
        <ButtonMui
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
          {icon && !iconAtTheEnd && <Icon icon={icon} sx={{ ...sxIcon }} />}
          {captionIsString ? (
            <Text caption={caption} sx={{ ...sxText }} />
          ) : (
            caption
          )}

          {icon && iconAtTheEnd && <Icon icon={icon} sx={{ ...sxIcon }} />}
        </ButtonMui>
      </Tooltip>
    );
  } else {
    return (
      <ButtonMui
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
        {icon && !iconAtTheEnd && <Icon icon={icon} sx={{ ...sxIcon }} />}
        {captionIsString ? (
          <Text caption={caption} sx={{ ...sxText }} />
        ) : (
          caption
        )}
        {icon && iconAtTheEnd && <Icon icon={icon} sx={{ ...sxIcon }} />}
      </ButtonMui>
    );
  }
}, areEqual);

export const MenuButtonTemplate = (props) => {
  const { sx, name, variant, ...other } = props;

  return (
    <Button
      variant={variant}
      sx={{
        ...sx,
      }}
      tooltipPosition="right"
      {...other}
    />
  );
};

export const ButtonIcon = (props) => {
  const { sx, sxIcon, icon, ...other } = props;

  return (
    <IconButton variant="text" sx={{ color: "inherit", ...sx }} {...other}>
      <Icon icon={icon} sx={{ ...sxIcon }} />
    </IconButton>
  );
};

export const ButtonGroup = (props) => {
  const { sx, sxButton, ...other } = props;

  return (
    <ButtonGroupMui
      sx={{ ".MuiButtonGroup-grouped": { minWidth: "max-content" }, ...sx }}
      {...other}
    />
  );
};
