import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { usePostWord } from "@/entities/Word/hooks";
import { WordPostParams } from "@/shared/api/word/model";
import { Box, Button, Input } from "@/shared/ui";
import { dispatchEvent } from "@/shared/utils";

const schema = z.object({
  caption: z.string().nonempty({message: "A new word can't be empty"}),
  description: z.string().nonempty({message: "A word translation can't be empty"}),
})

type ClientWordPostParams = Omit<WordPostParams, "dictionaryId">

export const CreateWordDialog = () => {
  const { mutate } = usePostWord();

  const {setFocus, register, setValue, handleSubmit, formState: {errors}} = useForm<ClientWordPostParams>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<ClientWordPostParams> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    setFocus("caption");
  },[])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledContainer flex column gap="20px">
        <Box flex grow column gap>
          <Input
            {...register("caption")}
            label="word"
            errorMessage={errors?.caption ? errors.caption.message : ""}
            onChange={(event) => {
              setValue("caption", event.target.value);
            }}
          />
          <Input
            {...register("description")}
            label="translation"
            errorMessage={errors?.description ? errors.description.message : ""}
            multiline
            onChange={(event) => {
              setValue("description", event.target.value);
            }}
          />
        </Box>
        <Box flex jc="flex-end" gap>
          <Button type="submit" caption="Add" color="success" />
          <Button
            caption="Cancel"
            variant="text"
            onClick={() => {
              dispatchEvent("dialog/trigger", { opened: false });
            }}
          />
        </Box>
      </StyledContainer>
    </form>
  );
};

const StyledContainer = styled(Box)(() => ({
  width: "300px",
  padding: "8px",
}));
