import { Box } from "@components";
import { Dictionaries } from "./dictionaries";
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
      addEventListener("onChangePage", () => {
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
      grow={3}
      center
      sx={{ backgroundColor: "white", borderRadius: 2 }}
    >
      {page === "dictionaries" && <Dictionaries />}
    </Box>
  );
};

export { Default as Page };
