import { useGetDictionary } from "@fetch";
import { areEqual } from "@utils";
import { memo, useEffect, useRef, useState } from "react";
import { TableContent } from "./content";
import { TableFooter } from "./footer";
import { TableHeader } from "./header";

const Default = memo((props) => {
  const { itemsPerPage, selectedItems } = props;
  const [selectCount, setSelectCount] = useState(0);
  const [selectMode, setSelectMode] = useState(false);
  const [page, setPage] = useState(1);

  const query = useRef({
    limit: itemsPerPage,
    offset: (page - 1) * itemsPerPage,
  });

  useEffect(() => {
    query.current = {
      ...query.current,
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
    };
  }, [itemsPerPage, page]);

  const response = useGetDictionary();

  return (
    <>
      <TableHeader
        query={query}
        selectMode={selectMode}
        selectedItemsCount={selectedItems.size}
      />
      <TableContent
        query={query.current}
        response={response}
        selectedItems={selectedItems}
        setSelectCount={setSelectCount}
        setSelectMode={setSelectMode}
        selectMode={selectMode}
        itemsPerPage={itemsPerPage}
        page={page}
      />
      <TableFooter
        data={response?.data}
        itemsPerPage={itemsPerPage}
        selectMode={selectMode}
        selectCount={selectCount}
        page={page}
        setPage={setPage}
      />
    </>
  );
}, areEqual);

export { Default as Table };
