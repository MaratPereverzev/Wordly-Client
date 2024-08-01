import { TextField } from "@mui/material";
import { Icon } from "../icon";

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
    <TextField
      label={label}
      name={name}
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
  );
};

export { Default as Input };
