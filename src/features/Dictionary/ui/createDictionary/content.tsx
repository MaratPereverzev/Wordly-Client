import { Box, ButtonIcon, Icon, Input, Popover, Text } from "@components";
import { styled } from "@mui/material";

export const Content = ({ dictionaryData, form }) => {
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
            <Icon icon="translation" sx={{ ".span": { fontSize: "30px" } }} />
            <StyledInput
              {...register("name", {
                required: "Dictionary name is required",
              })}
              errorMessage={errors.name ? errors.name.message : ""}
              placeholder="Dictionary name"
              variant="standard"
              onChange={(e) => {
                setValue("name", e.target.value);
                dictionaryData.current["caption"] = e.target.value;
              }}
            />
          </Box>
          <Popover
            button={<ButtonIcon icon="more" />}
            sxPopover={{ p: 1 }}
            sxButton={{ gap: 1 }}
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
            onChange={(e) => {
              setValue("description", e.target.value);
              dictionaryData.current["description"] = e.target.value;
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
