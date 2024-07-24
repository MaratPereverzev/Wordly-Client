import { useState } from "react";
import { Popover } from "@mui/material";
import { Box, Button } from "@components";

const Default = (props) => {
  const {
    button,
    children,
    closeOnClick,
    sxPopover,
    sxButton,
    boxProps,
    className,
    ...other
  } = props;
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
          sx={{ ...sxButton }}
          className={className}
        />
      ) : (
        <Button
          onClick={handleClick}
          sx={{ ...sxButton }}
          className={className}
        />
      )}
      <Popover
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
          <Box flex column sx={{ ...sxPopover }} {...boxProps}>
            {Array.isArray(children) ? (
              children.map((child, index) => {
                if (typeof child === "boolean" && child === false) return null;
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
                {typeof children === "boolean" && children === false ? null : (
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
      </Popover>
    </Box>
  );
};

export { Default as Popover };
