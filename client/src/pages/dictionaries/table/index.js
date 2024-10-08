import { useGetDictionary } from "@fetch";
import { areEqual } from "@utils";
import { memo } from "react";
import { TableContent } from "./content";
import { TableFooter } from "./footer";
import { TableHeader } from "./header";

const Default = memo((props) => {
  const response = useGetDictionary();

  return (
    <>
      <TableHeader />
      <TableContent response={response} />
      <TableFooter />
    </>
  );
}, areEqual);

export { Default as Table };
