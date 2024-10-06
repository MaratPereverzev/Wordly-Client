import { Box, Error, Loading, EmptyData } from "@components";
import { addEventListener, dispatchEvent } from "@utils";
import { useEffect } from "react";
import { ItemBox } from "./itemBox";

const Default = (props) => {
  const {
    selectedItems,
    setSelectCount,
    setSelectMode,
    selectMode,
    itemsPerPage,
    response,
    query,
  } = props;

  const { data, loading, error, get } = response;

  useEffect(() => {
    get({
      url:
        "?" +
        Object.keys(query)
          .map((key) => `${key}=${query[key]}`)
          .join("&"),
    });

    return addEventListener("onReload", () => {
      get({
        url:
          "?" +
          Object.keys(query)
            .map((key) => `${key}=${query[key]}`)
            .join("&"),
      });
    });
  }, [get, query]);

  useEffect(() => {
    dispatchEvent("onLoadData/dictionary", {
      pageCount: Math.ceil(data?.count / itemsPerPage),
    });
  }, [data, itemsPerPage]);

  useEffect(() =>
    addEventListener("onSelectMode", () => {
      if (!selectMode) {
        setSelectCount(0);
        selectedItems.clear();
      }
      setSelectMode((prev) => !prev);
    })
  );

  useEffect(
    () =>
      addEventListener("onCheck/dictionary", ({ detail }) => {
        if (detail.checked) selectedItems.set(detail.id, detail.checked);
        else selectedItems.delete(detail.id);
      }),
    [selectedItems]
  );

  return (
    <Box flex grow column sx={{ height: "100%", overflowY: "auto" }}>
      {(loading && <Loading />) ||
        (error && <Error />) ||
        (data && data?.rows.length && (
          <Box
            grid
            templateColumns="1fr 1fr 1fr"
            gap
            sx={{ gap: 1, p: 1, py: 0 }}
          >
            {data?.rows?.map((dictionary) => {
              return (
                <ItemBox
                  checked={selectedItems.get(dictionary.id) ?? false}
                  itemId={dictionary.id}
                  selectedItems={selectedItems}
                  key={dictionary.id}
                  data={dictionary}
                  setSelectCount={setSelectCount}
                  selectMode={selectMode}
                />
              );
            })}
          </Box>
        )) ||
        (data?.rows?.length === 0 && (
          <EmptyData
            message="It seems, you don't have any dictionary yet"
            icon="empty"
          />
        ))}
    </Box>
  );
};

export { Default as TableContent };
