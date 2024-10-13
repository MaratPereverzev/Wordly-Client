import {
  ButtonGroup as ButtonGroupMui,
  Button as ButtonMui,
  IconButton,
} from "@mui/material";
import { areEqual, getPageHash } from "@utils";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";
import { useDispatch } from "react-redux";
import { changePage, changeOpenState } from "@store/sidebar";

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

export const RouteButton = (props) => {
  const { route, onClick, ...other } = props;

  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        if (typeof onClick === "function") onClick();
        navigate(route);
      }}
      {...other}
    />
  );
};

export const MenuButton = (props) => {
  const { sx, icon, route, caption, ...other } = props;

  return (
    <RouteButton
      route={route}
      color="inherit"
      variant={
        !!route
          ? getPageHash() === route.split("/")[1]
            ? "contained"
            : "text"
          : "text"
      }
      sx={{ gap: "5px", ...sx }}
      icon={icon}
      caption={caption}
      {...other}
    />
  );
};

export const SidebarMenuButton = (props) => {
  const { sx, icon, route, open, caption, ...other } = props;

  const sidebar = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();

  return (
    <RouteButton
      route={route}
      color="inherit"
      variant={sidebar.page === route ? "contained" : "text"}
      sx={{ gap: "5px", ...sx }}
      icon={icon}
      caption={sidebar.open && caption}
      onClick={() => {
        dispatch(changeOpenState({ open: false }));
        dispatch(changePage({ route }));
      }}
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
