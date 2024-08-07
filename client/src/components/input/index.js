import { TextField } from "@mui/material";
import { Box } from "../box";
import { Icon } from "../icon";
import { Button } from "../button";

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
      onChange={
        typeof onChange === "function"
          ? onChange(name)
          : (e) => {
              console.log(e);
            }
      }
    />
  );
};

const InputFile = (props) => {
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
export { Default as Input, InputFile };
