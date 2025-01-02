import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ChangeEvent, useRef } from "react";
import { useDispatch } from "react-redux";

import { useTimeout } from "shared/hooks";
import { Input } from "shared/ui";

type InputQueryFilterProps = {
  queryField: string
  caseSensitive?: boolean
  storeDispatchFn: ActionCreatorWithPayload<any>
}

export const InputQueryFilter = ({queryField, caseSensitive = false, storeDispatchFn}: InputQueryFilterProps) => {
  const data = useRef<string | undefined>(undefined);

  const dispatch = useDispatch();

  const { timeoutReset } = useTimeout(() => {
    dispatch(
      storeDispatchFn({
        [queryField]: data?.current,
      })
    );
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
