import { Input } from "@components";
import { useRef } from "react";
import { dispatchEvent } from "@utils";
import { useTimeout } from "@hooks";

const Default = (props) => {
  const { query } = props;
  const data = useRef("");

  const { timeoutReset } = useTimeout(() => {
    if (data.current.length > 0) {
      query.current.caption = data.current;
    } else {
      delete query.current.caption;
    }

    dispatchEvent("onReload");
  }, 1000);

  return (
    <Input
      placeholder="search"
      name="search"
      onChange={() => (e) => {
        data.current = e?.target?.value;

        timeoutReset();
      }}
    />
  );
};

export { Default as InputCaption };
