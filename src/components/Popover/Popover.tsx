import { Box, Button, CustomButtonProps, CustomBoxProps } from "components";
import { Popover as PopoverMui, PopoverProps, SxProps } from "@mui/material";
import React, { useState } from "react";

type CustomPopoverProps = PopoverProps & {
  button?: React.JSX.Element,
  closeOnClick?: boolean,
  sxPopover?: SxProps,
  sxButton?: CustomButtonProps,
  boxProps?: CustomBoxProps,
}

export const Popover = ({
  button,
  children,
  closeOnClick,
  sxPopover,
  sxButton,
  boxProps,
  className,
  ...other
}: CustomPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.EventHandler<>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open: boolean = !!anchorEl;

  return (
    <Box flex>
      {button ? (
        <button.type
          {...button.props}
          onClick={handleClick}
          sx={sxButton}
          className={className}
        />
      ) : (
        <Button onClick={handleClick} sx={sxButton} className={className} />
      )}
      <PopoverMui
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        {...other}
      >
        {children && (
          <Box flex column sx={sxPopover} {...boxProps}>
            {Array.isArray(children) ? (
              children.map((child, index) => {
                if (!child) return null;
                return (
                  <child.type
                    key={index}
                    {...child.props}
                    onClick={() => {
                      if (child.props?.onClick) child.props.onClick();
                      if (closeOnClick) handleClose();
                    }}
                  />
                );
              })
            ) : (
              <children.type {...children.props}>
                {children === undefined ? null : (
                  <children.type
                    {...children.props}
                    onClick={() => {
                      if (children.props?.onClick) {
                        children.props.onClick();
                        if (closeOnClick) handleClose();
                      }
                    }}
                  />
                )}
              </children.type>
            )}
          </Box>
        )}
      </PopoverMui>
    </Box>
  );
};
