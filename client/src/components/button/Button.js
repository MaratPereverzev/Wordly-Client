import {
  ButtonGroup as ButtonGroupMui,
  Button as ButtonMui,
  IconButton,
  styled,
} from "@mui/material";
import { changeOpenState, changePage } from "@store/sidebar";
import { areEqual, getPageHash } from "@utils";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";

export const Button = memo(
  ({
    sxIcon = {},
    sxText = {},
    icon,
    caption,
    variant = "contained",
    iconAtTheEnd,
    tooltipPosition,
    ...other
  }) => {
    const captionIsString = typeof caption === "string";

    if (!!tooltipPosition && !caption) {
      return (
        <Tooltip disableInteractive title={icon} placement={tooltipPosition}>
          <StyledDefaultButton size="small" variant={variant} {...other}>
            {icon && !iconAtTheEnd && <Icon icon={icon} sx={sxIcon} />}
            {captionIsString ? <Text caption={caption} sx={sxText} /> : caption}

            {icon && iconAtTheEnd && <Icon icon={icon} sx={sxIcon} />}
          </StyledDefaultButton>
        </Tooltip>
      );
    } else {
      return (
        <StyledDefaultButton size="small" variant={variant} {...other}>
          {icon && !iconAtTheEnd && <Icon icon={icon} sx={sxIcon} />}
          {captionIsString ? <Text caption={caption} sx={sxText} /> : caption}
          {icon && iconAtTheEnd && <Icon icon={icon} sx={sxIcon} />}
        </StyledDefaultButton>
      );
    }
  },
  areEqual
);

export const RouteButton = ({ route, onClick, ...other }) => {
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

export const MenuButton = ({ icon, route, caption, ...other }) => {
  return (
    <StyledRouteButton
      route={route}
      color="inherit"
      variant={
        !!route
          ? getPageHash() === route.split("/")[1]
            ? "contained"
            : "text"
          : "text"
      }
      icon={icon}
      caption={caption}
      {...other}
    />
  );
};

export const SidebarMenuButton = ({ icon, route, open, caption, ...other }) => {
  const sidebar = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();

  return (
    <StyledRouteButton
      route={route}
      color="inherit"
      variant={sidebar.page === route ? "contained" : "text"}
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

export const ButtonIcon = ({ sxIcon, icon, ...other }) => {
  return (
    <StyledIconButton variant="text" {...other}>
      <Icon icon={icon} sx={sxIcon} />
    </StyledIconButton>
  );
};

export const ButtonGroup = (props) => {
  return <StyledGroupButton {...props} />;
};

const StyledDefaultButton = styled(ButtonMui)(() => ({
  padding: "4px",
  justifyContent: "flex-start",
  minWidth: "min-content",
  textTransform: "capitalize",
}));

const StyledRouteButton = styled(RouteButton)(() => ({
  gap: "5px",
}));

const StyledIconButton = styled(IconButton)(() => ({
  color: "inherit",
}));

const StyledGroupButton = styled(ButtonGroupMui)(() => ({
  ".MuiButtonGroup-grouped": { minWidth: "max-content" },
}));
