import { styled, SxProps, TextField, TextFieldProps } from "@mui/material";
import React, { CSSProperties, forwardRef } from "react";

import { Box } from "../Box";
import { Button, CustomButtonProps } from "../Button";
import { Icon, IconListKeys } from "../Icon";
//import { FileData } from"@/shared/types";

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


export const Input = forwardRef(({
  icon,
  sxIcon,
  sxBox,
  variant = "outlined",
  errorMessage,
  helperText,
  ...other
}: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <TextField
      sx={{
        ">.MuiFormHelperText-root":{
          marginX: 0
        }
      }}
      ref={ref}
      variant={variant}
      size="small"
      error={errorMessage && errorMessage !== "" ? true : false}
      helperText={errorMessage ?? helperText ?? ""}
      {...other}
    />
  );
});

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
      />
    </Box>
  );
};

const StyledDefaultInputIcon = styled(Icon)(() => ({ color: "black", pr: 1 }));
