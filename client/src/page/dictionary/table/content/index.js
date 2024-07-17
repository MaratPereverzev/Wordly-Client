import { Box, Loading, Error } from "@components";
import { useFetch } from "@hooks";
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

  const { loading, error, data } = useFetch(
    "http://localhost:8080/api/dictionaries",
    {
      queryParams: {
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
      },
    },
    (data) => {
      if (data !== null)
        dispatchEvent("onLoadData", {
          pageCount: Math.ceil(data?.count / data?.rows?.length),
        });
    }
  );

  console.log(error);

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
    <Box flex grow column sx={{ height: "100%", overflowY: "auto" }}>
      {(loading && <Loading />) ||
        (error && <Error />) ||
        (data && (
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
        ))}
    </Box>
  );
};

export { Default as TableContent };
