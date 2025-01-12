import { useParams } from "react-router-dom";
import { MutableRefObject } from "react";
import { UseFormReturn } from "react-hook-form";

import { Button, Box } from"@/shared/ui";
import { dispatchEvent } from"@/shared/utils";
import { usePostDictionary } from"@/entities/Dictionary/hooks";
import { DictionaryPostParams } from"@/shared/api/dictionary/model";

type ActionProps = {
  dictionaryData: MutableRefObject<Partial<DictionaryPostParams>>
  form: UseFormReturn<Partial<DictionaryPostParams>, any, undefined>
}

export const Action = ({ dictionaryData, form }: ActionProps) => {
  const id = useParams()
  const { mutate } = usePostDictionary(String(id));

  const { handleSubmit } = form;

  const onSubmit = () => {
    dispatchEvent("dialogTrigger", { opened: false });
    mutate(dictionaryData.current as DictionaryPostParams);
  };

  return (
    <Box flex jc="flex-end" gap>
      <Button
        color="success"
        caption="Create"
        sxText={{ px: 1 }}
        onClick={handleSubmit(onSubmit)}
      />
      <Button
        variant="text"
        caption="Cancel"
        sxText={{ px: 1 }}
        onClick={() => {
          dispatchEvent("dialogTrigger", { opened: false });
        }}
      />
    </Box>
  );
};
