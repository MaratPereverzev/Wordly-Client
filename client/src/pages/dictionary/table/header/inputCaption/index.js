import { Input } from "@components";
import { useRef } from "react";
import { dispatchEvent } from "@utils";

const Default = (props) => {
  const data = useRef("");

  return (
    <Input
      placeholder="search"
      name="search"
      onChange={() => (e) => {
        data.current = e?.target?.value;

        dispatchEvent("onChangeDictionarySearch", {
          caption: `%${data.current}%`,
        });
      }}
    />
  );
};

export { Default as InputCaption };
