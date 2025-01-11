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
import { useNavigate } from "react-router-dom";

import { useSidebarStore } from "app/store/sidebar";
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
  route: string,
}

type CustomSidebarMenuButtonProps = Omit<CustomRouteButtonProps, "onClick"> & {
  open?: boolean,
  onClick?: () => void
}

export const SidebarMenuButton = ({ icon, route, open, caption, onClick, ...other }: CustomSidebarMenuButtonProps) => {
  const sidebar = useSidebarStore(store => store);
  const navigate = useNavigate();

  return <StyledRouteButton
    color="inherit"
    variant={sidebar.route === route ? "contained" : "text"}
    icon={icon}
    caption={sidebar.open && caption}
    onClick={() => {
      if(onClick) onClick();
      sidebar.changeIsOpen(false);
      sidebar.changeRoute(route)
      navigate(route);
    }}
    {...other}
  />
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


const StyledRouteButton = styled(Button)(() => ({
  gap: "5px",
}));


const StyledIconButton = styled(IconButton)(() => ({
  color: "inherit",
}));

const StyledGroupButton = styled(ButtonGroupMui)(() => ({
  ".MuiButtonGroup-grouped": { minWidth: "max-content" },
}));
