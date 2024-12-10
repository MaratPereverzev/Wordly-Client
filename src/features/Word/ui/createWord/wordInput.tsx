import { Box, Input } from "shared/ui";

export const WordInput = ({ form }) => {
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
        label="word"
        errorMessage={errors?.caption ? errors.caption.message : ""}
        onChange={(event) => {
          setValue("caption", event.target.value);
        }}
      />
      <Input
        {...register("description", {
          required: "description is required",
        })}
        label="translation"
        errorMessage={errors?.description ? errors.description.message : ""}
        multiline
        onChange={(event) => {
          setValue("description", event.target.value);
        }}
      />
    </Box>
  );
};
