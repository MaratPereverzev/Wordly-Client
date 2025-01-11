import { styled, SxProps, TextField, TextFieldProps } from "@mui/material";
import { CSSProperties } from "react";

import { Box } from "../Box";
import { Button, CustomButtonProps } from "../Button";
import { Icon, IconListKeys } from "../Icon";
import { FileData } from"@/shared/types";

//temporary solution
type InputProps = TextFieldProps & Omit<CustomButtonProps, "onChange" | "variant"> & {
  icon?: IconListKeys,
  sxIcon?: CSSProperties,
  sxBox?: SxProps,
  errorMessage?: string
}

type InputFileProps = Omit<TextFieldProps, "variant"> & Omit<CustomButtonProps, "onChange"> & {
  icon?: IconListKeys,
  sxIcon?: CSSProperties,
  sxBox?: SxProps,
  errorMessage?: string,
  sxButton?: SxProps
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

export const InputFile = ({ sxBox, sxButton, onChange, ...other }: InputFileProps) => {
  return (
    <Box className="button-container" sx={sxBox}>
      <Button
        variant="contained"
        caption="Choose file"
        color="inherit"
        sx={sxButton}
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
        onChange={onChange}
        /*onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const backgroundPhoto = document.getElementById(
            "dictionaryBackground"
          ) as HTMLImageElement;
          const reader = new FileReader();
          const file = event.target.files?.[0]!;

          reader.onloadend = () => {
            const data = {
              caption: file.name,
              data: file,
              type: file.type,
              preview: reader.result,
            };
            backgroundPhoto.src = data.preview as string;
            //if(onChange !== undefined) onChange(data);
          };

          reader.readAsDataURL(file);
        }}*/
      />
    </Box>
  );
};

const StyledDefaultInputIcon = styled(Icon)(() => ({ color: "black", pr: 1 }));
