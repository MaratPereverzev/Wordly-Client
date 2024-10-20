import { Box, Button } from "@components";
import { Popover as PopoverMui } from "@mui/material";
import { useState } from "react";

export const Popover = ({
  button,
  children,
  closeOnClick,
  sxPopover,
  sxButton,
  boxProps,
  className,
  ...other
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

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
