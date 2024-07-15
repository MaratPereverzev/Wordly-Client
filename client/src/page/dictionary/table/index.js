import { Box, Loading } from "@components";
import { addEventListener, areEqual } from "@utils";
import { useEffect, useState, memo } from "react";
import useFetch from "use-http";
import { TableFooter } from "./footer";
import { TableHeader } from "./header";
import { ItemBox } from "./itemBox";

const Default = memo((props) => {
  const { itemsPerPage, selectedItems } = props;
  const [data, setData] = useState({});
  const [selectCount, setSelectCount] = useState(0);
  const [selectMode, setSelectMode] = useState(false);
  const [page, setPage] = useState(1);

  const { get, loading, error, response } = useFetch("http://localhost:8080");

  useEffect(() => {
    const getDictionaries = async () => {
      const dictionaries = await get(
        `api/dictionary?limit=${itemsPerPage}&offset=${
          (page - 1) * itemsPerPage
        }`
      );

      if (response.ok)
        setData((prev) => {
          prev = dictionaries;
          return prev;
        });
    };

    getDictionaries();
  }, [get, response, page, itemsPerPage]);

  useEffect(
    () =>
      addEventListener("onChangeQuery", ({ detail }) => {
        const getDictionaries = async () => {
          const dictionaries = await get(
            `api/dictionary?limit=${itemsPerPage}&offset=${
              (page - 1) * itemsPerPage
            }&caption=${detail.query}`
          );

          if (response.ok)
            setData((prev) => {
              prev = dictionaries;
              return prev;
            });
        };

        getDictionaries();
      }),
    [get, itemsPerPage, page, response]
  );

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

  console.log(data.rows);
  return (
    <>
      <TableHeader
        selectMode={selectMode}
        selectedItemsCount={selectedItems.size}
      />
      <Box flex grow column sx={{ height: "100%", overflowY: "auto" }}>
        {(error && "Error!") || (loading && <Loading />) || (
          <Box grid templateColumns="1fr 1fr 1fr" sx={{ gap: 1, p: 1, py: 0 }}>
            {data?.rows?.map((dictionary) => {
              return (
                <ItemBox
                  checked={selectedItems.get(dictionary.id) ?? false}
                  itemId={dictionary.id}
                  selectedItems={selectedItems}
                  key={dictionary.id}
                  caption={`${dictionary.id} - ${dictionary.caption}`}
                  setSelectCount={setSelectCount}
                  selectMode={selectMode}
                />
              );
            })}
          </Box>
        )}
      </Box>
      <TableFooter
        selectMode={selectMode}
        selectCount={selectCount}
        setSelectCount={setSelectCount}
        page={page}
        pageCount={Math.ceil(data.count / itemsPerPage)}
        setPage={setPage}
      />
    </>
  );
}, areEqual);

export { Default as Table };
