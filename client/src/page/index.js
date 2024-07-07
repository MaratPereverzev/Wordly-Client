import { Box } from "@components";
import { Dictionaries } from "./dictionary";
import { useEffect, useState } from "react";
import {
  addEventListener,
  getPageHash,
  dispatchEvent,
  getLocalStorageValue,
  setLocalStorageValue,
} from "@utils";

const Default = (props) => {
  const [page, setPage] = useState(getLocalStorageValue("page") ?? "home");

  useEffect(
    () =>
      addEventListener("onChangePage/sidebar", () => {
        setPage((prev) => {
          prev = getPageHash();
          return prev;
        });
        dispatchEvent("closeSideBar");
      }),
    []
  );

  useEffect(() => {
    setLocalStorageValue("page", page);
  }, [page]);

  return (
    <Box
      flex
      column
      grow
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      {page === "dictionaries" && <Dictionaries />}
    </Box>
  );
};

export { Default as Page };
