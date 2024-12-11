import { UseFormReturn } from "react-hook-form";

import { Box, Input } from "@/shared/ui";
import { WordPostParams } from "@/shared/api/word/model";

type WordInputParams = {
  form: UseFormReturn<Partial<WordPostParams>, any, undefined>
}

export const WordInput = ({ form }: WordInputParams) => {
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
