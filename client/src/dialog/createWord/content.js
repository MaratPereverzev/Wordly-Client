import { Box, Input, Text } from "@components";
export const Content = ({ form }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  return (
    <Box flex grow column gap>
      <Input
        {...register("caption", {
          required: "caption is required",
        })}
        errorMessage={errors?.caption ? errors.caption.message : ""}
        label="word"
        onChange={(e) => {
          setValue("caption", e.target.value);
        }}
      />
      <Input
        {...register("description", {
          required: "description is required",
        })}
        label="translation"
        errorMessage={errors?.description ? errors.description.message : ""}
        multiline
        onChange={(e) => {
          setValue("description", e.target.value);
        }}
      />
    </Box>
  );
};
