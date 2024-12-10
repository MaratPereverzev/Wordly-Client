import { styled, SxProps, TextField, TextFieldProps } from "@mui/material";
import { Icon, iconListKeys } from "../Icon";
import { Box } from "../Box";
import { Button, CustomButtonProps } from "../Button";
import { CSSProperties } from "react";

type InputProps = TextFieldProps & CustomButtonProps & {
  icon?: iconListKeys,
  sxIcon?: CSSProperties,
  sxBox?: SxProps,
  errorMessage?: string
}

export const Input = ({
  icon,
  sxIcon,
  sxBox,
  variant = "outlined",
  errorMessage,
  helperText,
  ...other
}: InputProps) => {
  return (
    <TextField
      variant={variant}
      size="small"
      error={errorMessage && errorMessage !== "" ? true : false}
      helperText={errorMessage ?? helperText ?? ""}
      InputProps={{
        startAdornment: icon && (
          <StyledDefaultInputIcon icon={icon} sx={sxIcon} />
        ),
      }}
      {...other}
    />
  );
};

export const InputFile = ({ sxBox, sxButton, onChange, ...other }: InputProps & {sxButton: SxProps}) => {
  return (
    <Box className="button-container" sx={sxBox}>
      <Button
        variant="contained"
        caption="Choose file"
        color="inherit"
        sx={sxButton}
        /*onClick={() => {
          const input = document.getElementById("pasteFileButton");
          input?.click();
        }}*/
        {...other}
      />
      <input
        id="pasteFileButton"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e: any) => {
          const backgroundPhoto = document.getElementById(
            "dictionaryBackground"
          ) as HTMLImageElement;
          const reader = new FileReader();

          reader.onloadend = () => {
            const data = {
              caption: e.target?.files[0].name,
              data: e.target?.files[0],
              type: e.target?.files[0].type,
              preview: reader.result,
            };
            backgroundPhoto.src = data.preview as string;
            //onChange(data);
          };

          reader.readAsDataURL(e.target?.files[0]);
        }}
      />
    </Box>
  );
};

const StyledDefaultInputIcon = styled(Icon)(() => ({ color: "black", pr: 1 }));
