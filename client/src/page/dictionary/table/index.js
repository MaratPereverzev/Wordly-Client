import { Box, Loading } from "@components";
import { TableHeader } from "./header";
import { TableFooter } from "./footer";
import { ItemBox } from "./itemBox";
import { useEffect, useState } from "react";
import { addEventListener } from "@utils";
import useFetch from "use-http";

const selectedItems = new Map();

const Default = (props) => {
  const { itemsPerPage } = props;
  const [data, setData] = useState({});
  const [selectCount, setSelectCount] = useState(0);
  const [selectMode, setSelectMode] = useState(false);
  const [page, setPage] = useState(1);

  const { get, loading, error, response } = useFetch("https://dummyjson.com");

  useEffect(() => {
    const getDictionaries = async () => {
      const dictionaries = await get(
        `/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`
      );

      if (response.ok)
        setData((prev) => {
          prev = dictionaries;
          return prev;
        });
    };

    getDictionaries();
  }, [get, response, page, itemsPerPage]);

  useEffect(() =>
    addEventListener("onSelectMode", () => {
      if (!selectMode) {
        setSelectCount(0);
        selectedItems.clear();
      }
      setSelectMode((prev) => !prev);
    })
  );
  useEffect(() =>
    addEventListener("onCheck/dictionary", ({ detail }) => {
      if (detail.checked) selectedItems.set(detail.id, detail.checked);
      else selectedItems.delete(detail.id);
    })
  );

  return (
    <>
      <TableHeader selectMode={selectMode} />
      <Box flex grow column sx={{ height: "100%", overflowY: "auto" }}>
        {(error && "Error!") || (loading && <Loading />) || (
          <Box grid templateColumns="1fr 1fr 1fr" sx={{ gap: 1, p: 1, py: 0 }}>
            {data?.products?.map((dictionary) => (
              <ItemBox
                checked={selectedItems.get(dictionary.id) ?? false}
                itemId={dictionary.id}
                selectedItems={selectedItems}
                key={dictionary.id}
                caption={`${dictionary.id} - ${dictionary.title}`}
                setSelectCount={setSelectCount}
                selectMode={selectMode}
              />
            ))}
          </Box>
        )}
      </Box>
      <TableFooter
        selectMode={selectMode}
        selectCount={selectCount}
        setSelectCount={setSelectCount}
        page={page}
        pageCount={Math.ceil(data.total / itemsPerPage)}
        setPage={setPage}
      />
    </>
  );
};

export { Default as Table };
