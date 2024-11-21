import { Input } from "@components";
import { useTimeout } from "@hooks";
import { changeQuerySearch } from "@store/dictionaries";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export const InputCaption = () => {
  const data = useRef(undefined);

  const dispatch = useDispatch();

  const { timeoutReset } = useTimeout(() => {
    dispatch(
      changeQuerySearch({
        caption: data?.current ? `%${data.current}%` : undefined,
      })
    );
  }, 1500);

  return (
    <Input
      placeholder="search"
      name="search"
      onChange={(e) => {
        if (e?.target?.value) data.current = e?.target?.value;
        else data.current = undefined;

        timeoutReset();
      }}
    />
  );
};
