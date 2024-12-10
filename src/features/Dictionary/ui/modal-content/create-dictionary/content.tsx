import { Box, ButtonIcon, Icon, Input, Popover, Text } from "shared/ui";
import { styled } from "@mui/material";
import { ChangeEvent, MutableRefObject } from "react";
import { DictionaryPostParams } from "shared/api/dictionary/model";
import { UseFormReturn } from "react-hook-form";

type ContentProps = {
  dictionaryData: MutableRefObject<Partial<DictionaryPostParams>>
  form: UseFormReturn<Partial<DictionaryPostParams>, any, undefined>
}
export const Content = ({ dictionaryData, form }: ContentProps) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = form;

  return (
    <>
      <Box className="createDictionary content" column flex>
        <Box flex ai jc="space-between" sx={{ py: 2 }}>
          <Box flex gap="20px" ai>
            <Icon icon="translation" sx={{ fontSize: "30px" }} />
            <StyledInput
              {...register("caption", {
                required: "Dictionary name is required",
              })}
              errorMessage={errors.caption ? errors.caption.message : ""}
              placeholder="Dictionary name"
              variant="standard"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue("caption", event.target.value);
                dictionaryData.current["caption"] = event.target.value;
              }}
            />
          </Box>
          <Popover
            button={<ButtonIcon icon="more" />}
            sxPopover={{ p: 1 }}
            sxButton={{gap: 1}}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Text caption="Coming soon" />
          </Popover>
        </Box>
      </Box>
      <Box flex column sx={{ width: "100%" }} grow>
        <Box flex gap="20px" ai sx={{ width: "100%" }}>
          <Text caption="Description" />
          <Input
            {...register("description", {
              required: "Description is required",
            })}
            errorMessage={errors.description ? errors.description.message : ""}
            multiline
            placeholder="Your description is in here!"
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setValue("description", event.target.value);
              dictionaryData.current["description"] = event.target.value;
            }}
          />
        </Box>
      </Box>
    </>
  );
};

const StyledInput = styled(Input)(() => ({
  background: "transparent",
  border: "none",
  ".css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
    content: "none",
  },
  ".css-1eed5fa-MuiInputBase-root-MuiInput-root::after": {
    content: "none",
  },
  ".css-nz481w-MuiInputBase-input-MuiInput-input": {
    fontSize: "30px",
  },
}));
