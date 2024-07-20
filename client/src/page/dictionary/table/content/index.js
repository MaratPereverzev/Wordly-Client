import { Box, Loading, Error } from "@components";
import { useFetch, useTimeout } from "@hooks";
import { addEventListener, dispatchEvent } from "@utils";
import { useEffect, useContext } from "react";
import { ItemBox } from "./itemBox";
import { UserContextData } from "@context";

const Default = (props) => {
  const {
    selectedItems,
    setSelectCount,
    setSelectMode,
    selectMode,
    itemsPerPage,
    page,
  } = props;

  const userData = useContext(UserContextData);

  const { loading, error, data, setOptions } = useFetch(
    "http://localhost:8080/api/private/dictionary",
    {
      query: {
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
      },
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: userData?.accessToken,
        "User-Agent": "any-name",
      },
    },
    (data) => {
      if (data !== null)
        dispatchEvent("onLoadData/dictionary", {
          itemsPerPage,
          pageCount: Math.ceil(data?.count / itemsPerPage),
        });
    }
  );

  const { timeoutReset } = useTimeout((data) => {
    setOptions((prev) => {
      prev.queryParams = { ...prev.queryParams, ...data };
      return { ...prev };
    });
  }, 1000);

  useEffect(
    () =>
      addEventListener("onChangeDictionarySearch", ({ detail }) => {
        timeoutReset(detail);
      }),
    [timeoutReset]
  );

  useEffect(
    () =>
      addEventListener("onChangeQuery/dictionary", ({ detail }) => {
        setOptions((prev) => {
          prev.queryParams = { ...prev.queryParams, ...detail };
          return { ...prev };
        });
      }),
    [setOptions]
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
