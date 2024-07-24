import { Icon } from "../icon";
import { Box } from "../box";
import { TextField } from "@mui/material";

const Default = (props) => {
  const {
    icon,
    sxIcon,
    sx,
    sxBox,
    variant = "outlined",
    label,
    onChange,
    name,
    ...other
  } = props;

  return (
    <Box flex center gap="5px" sx={{ ...sxBox }}>
      <TextField
        label={label ?? name}
        variant={variant}
        size="small"
        sx={{ ...sx }}
        InputProps={{
          startAdornment: icon && (
            <Icon icon={icon} sx={{ color: "black", pr: 1, ...sxIcon }} />
          ),
        }}
        {...other}
        onChange={typeof onChange === "function" ? onChange(name) : (e) => {}}
      />
    </Box>
  );
};

export { Default as Input };
