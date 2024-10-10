import { TextField } from "@mui/material";
import { Icon } from "../Icon";
import { Box } from "../Box";
import { Button } from "../Button";

export const Input = (props) => {
  const {
    icon,
    sxIcon,
    sx,
    sxBox,
    variant = "outlined",
    label,
    name,
    errorMessage,
    helperText,
    ...other
  } = props;

  return (
    <TextField
      label={label}
      name={name}
      variant={variant}
      size="small"
      error={errorMessage && errorMessage !== "" ? true : false}
      helperText={errorMessage ?? helperText ?? ""}
      sx={{ ...sx }}
      InputProps={{
        startAdornment: icon && (
          <Icon icon={icon} sx={{ color: "black", pr: 1, ...sxIcon }} />
        ),
      }}
      {...other}
    />
  );
};

export const InputFile = (props) => {
  const { sxBox, sxButton, onChange, ...other } = props;

  return (
    <Box className="button-container" sx={{ ...sxBox }}>
      <Button
        caption="Choose file"
        color="inherit"
        sx={{ ...sxButton }}
        onClick={() => {
          const input = document.getElementById("pasteFileButton");
          input?.click();
        }}
        {...other}
      />
      <input
        id="pasteFileButton"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const backgroundPhoto = document.getElementById(
            "dictionaryBackground"
          );
          const reader = new FileReader();

          reader.onloadend = () => {
            const data = {
              caption: e.target?.files[0].name,
              data: e.target?.files[0],
              type: e.target?.files[0].type,
              preview: reader.result,
            };
            backgroundPhoto.src = data.preview;
            onChange(data);
          };

          reader.readAsDataURL(e.target?.files[0]);
        }}
      />
    </Box>
  );
};
