import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useImportWord } from "@/entities/Word";
import { Box, Button, Input, Text } from "@/shared/ui";
import { dispatchEvent } from "@/shared/utils";

const schema = z.object({
  id: z.string().nonempty({message: "Id can't be empty"}),
})

type ClientWordGetParams = {id: string}

export const ImportWordDialog = () => {
  const { mutate } = useImportWord();

  const {setFocus, register, setValue, handleSubmit, formState: {errors}} = useForm<ClientWordGetParams>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<ClientWordGetParams> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    setFocus("id");
  },[])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledContainer flex column gap="20px">
        <Box flex grow center>
          <Text caption="Import a word" sx={{fontSize: "40px"}}/>
        </Box>
        <Box flex grow column gap>
          <Input
            {...register("id")}
            label="id"
            errorMessage={errors?.id ? errors.id.message : ""}
            onChange={(event) => {
              setValue("id", event.target.value);
            }}
          />
        </Box>
        <Box flex jc="flex-end" gap>
          <Button type="submit" caption="Import" color="success"/>
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
