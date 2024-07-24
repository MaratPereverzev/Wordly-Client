import { areEqual } from "@utils";
import { memo, useState } from "react";
import { TableContent } from "./content";
import { TableFooter } from "./footer";
import { TableHeader } from "./header";

const Default = memo((props) => {
  const { itemsPerPage, selectedItems } = props;
  const [selectCount, setSelectCount] = useState(0);
  const [selectMode, setSelectMode] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <>
      <TableHeader
        selectMode={selectMode}
        selectedItemsCount={selectedItems.size}
      />
      <TableContent
        selectedItems={selectedItems}
        setSelectCount={setSelectCount}
        setSelectMode={setSelectMode}
        selectMode={selectMode}
        itemsPerPage={itemsPerPage}
        page={page}
      />
      <TableFooter
        itemsPerPage={itemsPerPage}
        selectMode={selectMode}
        selectCount={selectCount}
        setSelectCount={setSelectCount}
        page={page}
        setPage={setPage}
      />
    </>
  );
}, areEqual);

export { Default as Table };
