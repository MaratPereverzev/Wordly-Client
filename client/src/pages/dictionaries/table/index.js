import { areEqual } from "@utils";
import { memo } from "react";
import { TableContent } from "./content";
import { TableFooter } from "./footer";
import { TableHeader } from "./header";

export const Table = memo(() => {
  return (
    <>
      <TableHeader />
      <TableContent />
      <TableFooter />
    </>
  );
}, areEqual);
