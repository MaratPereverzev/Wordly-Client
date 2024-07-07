import { Icon } from "../icon";
import { Box } from "../box";
import { areEqual } from "@utils";
import { memo } from "react";
import { TextField } from "@mui/material";

const Default = memo((props) => {
  const { icon, iconSx, sx, variant = "outlined", ...other } = props;

  return (
    <Box flex center gap="5px">
      <TextField
        variant={variant}
        size="small"
        sx={{ ...sx }}
        InputProps={{
          startAdornment: icon && (
            <Icon icon={icon} sx={{ color: "black", pr: 1, ...iconSx }} />
          ),
        }}
        {...other}
      />
    </Box>
  );
}, areEqual);

export { Default as Input };
