import { ChangeEvent, useRef } from "react";

import { useTimeout } from"@/shared/hooks";
import { Input } from"@/shared/ui";
import { useDictionaryStore } from"@/entities/Dictionary";

type InputQueryFilterProps = {
  queryField: string
  caseSensitive?: boolean
}

export const InputQueryFilter = ({queryField, caseSensitive = false}: InputQueryFilterProps) => {
  const data = useRef<string | undefined>("");
  const changeQuerySearch = useDictionaryStore(state => state.changeQuerySearch)

  const { timeoutReset } = useTimeout(() => {
    changeQuerySearch({
      [queryField]: data.current,
    })
  }, 1500);

  return (
    <Input
      placeholder="search"
      name="input_query_filter"
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        data.current = inputValue ? (caseSensitive? inputValue : `%${inputValue}%`) : undefined;
        timeoutReset();
      }}
    />
  );
};
