import { Box, Error, Icon, Loading, Text } from "@components";
import { useGetDictionary } from "@fetch";
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
    page,
  } = props;

  const { data, loading, error, get } = useGetDictionary(
    `limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`
  );

  useEffect(() => {
    get();

    return addEventListener("onReload", () => {
      get();
    });
  }, [get]);

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
          <Box grid templateColumns="1fr 1fr 1fr" sx={{ gap: 1, p: 1, py: 0 }}>
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
          <Box flex grow center column sx={{ color: "grey" }}>
            <Icon icon="empty" sx={{ ".span": { fontSize: "70px" } }} />
            <Text
              caption="It seems, you don't have any dictionary yet"
              sx={{ fontSize: "25px" }}
            />
          </Box>
        ))}
    </Box>
  );
};

export { Default as TableContent };
