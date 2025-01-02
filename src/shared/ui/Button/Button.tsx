import {
  ButtonGroup as ButtonGroupMui,
  ButtonGroupProps,
  Button as ButtonMui,
  ButtonProps,
  IconButton,
  styled,
  SxProps,
  Theme,
  Tooltip
} from "@mui/material";
import { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeOpenState, changePage } from "app/store/sidebar";
import { useAppSelector } from "shared/hooks/useSelector";
import { getPageHash } from "shared/utils";
import { Icon, IconListKeys } from "../Icon";
import { Text } from "../Text";

export type CustomButtonProps = ButtonProps & {
  sxIcon?: SxProps<Theme>,
  sxText?: SxProps<Theme>,
  icon?: IconListKeys,
  caption?: string | boolean,
  iconAtTheEnd?: boolean,
  placement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start"
  title?: string
}

export const Button =
  ({
    sxIcon = {},
    sxText = {},
    icon,
    caption,
    variant = "contained",
    iconAtTheEnd,
    placement,
    title,
    ...other
  }: CustomButtonProps) => {
    const captionIsString = typeof caption === "string";

    if (placement && !caption) {
      return (
        <Tooltip disableInteractive title={title} placement={placement}>
          <StyledDefaultButton size="small" variant={variant} {...other}>
            {icon && !iconAtTheEnd && <Icon icon={icon} sx={sxIcon as CSSProperties} />}
            {captionIsString ? <Text caption={caption} sx={sxText} /> : caption}

            {icon && iconAtTheEnd && <Icon icon={icon} sx={sxIcon  as CSSProperties} />}
          </StyledDefaultButton>
        </Tooltip>
      );
    } else {
      return (
        <StyledDefaultButton size="small" variant={variant} {...other}>
          {icon && !iconAtTheEnd && <Icon icon={icon} sx={sxIcon  as CSSProperties} />}
          {captionIsString ? <Text caption={caption} sx={sxText} /> : caption}
          {icon && iconAtTheEnd && <Icon icon={icon} sx={sxIcon  as CSSProperties} />}
        </StyledDefaultButton>
      );
    }
  }

type CustomRouteButtonProps = CustomButtonProps & {
  route: string
}

export const RouteButton = ({ route, onClick, ...other }: CustomRouteButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        if (typeof onClick === "function") //onClick();
        navigate(route);
      }}
      {...other}
    />
  );
};
/*
export const MenuButton = ({ icon, route, caption, ...other }: CustomRouteButtonProps) => {
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
*/

type CustomSidebarMenuButtonProps = CustomRouteButtonProps & {
  open?: boolean
}

export const SidebarMenuButton = ({ icon, route, open, caption, ...other }: CustomSidebarMenuButtonProps) => {
  const sidebar = useAppSelector(store => store.sidebarReducer);
  const dispatch = useDispatch();

  return (
    <StyledRouteButton
      route={route}
      color="inherit"
      variant={sidebar.route === route ? "contained" : "text"}
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

type ButtonIconProps = ButtonProps & {
  sxIcon?: React.CSSProperties,
  icon?: IconListKeys
}

export const ButtonIcon = ({ sxIcon, icon, ...other }: ButtonIconProps) => {
  return (
    <StyledIconButton variant="text" {...other}>
      <Icon icon={icon} sx={sxIcon} />
    </StyledIconButton>
  );
};

/*
type CustomButtonGroupProps = ButtonGroupProps & {
  caption: string
}
*/
export const ButtonGroup = (props: ButtonGroupProps) => {
  return <StyledGroupButton {...props} />;
};

const StyledDefaultButton = styled(ButtonMui)(({ theme }) => ({
  //color: theme.palette.primary.contrastText,
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
