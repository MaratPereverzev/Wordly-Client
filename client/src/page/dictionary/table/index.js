import { Box, Loading, Checkbox } from "@components";
import { TableHeader } from "./header";
import { TableFooter } from "./footer";
import { useEffect, useState, memo } from "react";
import { addEventListener } from "@utils";
import useFetch from "use-http";

const areEqual = (prev, next) => {
  return (
    prev.sx === next.sx &&
    prev.caption === next.caption &&
    prev.selectMode === next.selectMode &&
    prev.setSelectCount === next.setSelectCount
  );
};

const MyBox = memo((props) => {
  const { sx, caption, selectMode, setSelectCount, ...other } = props;

  return (
    <Box
      flex
      jc
      sx={{
        height: "8.5rem",
        border: ({ palette }) => `1px solid ${palette.divider}`,
        borderRadius: 1,
        cursor: "pointer",
        transition: "background-color 200ms ease-in-out",
        "&:hover": {
          backgroundColor: ({ palette }) => palette.divider,
        },
        ...sx,
      }}
      {...other}
    >
      <Box center flex grow>
        {caption}
      </Box>
      <Box>
        {selectMode && (
          <Checkbox
            onChange={(e) => {
              e.target.checked
                ? setSelectCount((prev) => prev + 1)
                : setSelectCount((prev) => prev - 1);
            }}
          />
        )}
      </Box>
    </Box>
  );
}, areEqual);

const Default = (props) => {
  const { itemsPerPage } = props;
  const [data, setData] = useState({});
  const [selectCount, setSelectCount] = useState(0);
  const [selectMode, setSelectMode] = useState(false);
  const [page, setPage] = useState(1);

  const { get, loading, error, response } = useFetch("https://dummyjson.com");

  useEffect(() => {
    const getUsers = async () => {
      const dictionaries = await get(
        `/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`
      );

      if (response.ok)
        setData((prev) => {
          prev = dictionaries;
          return prev;
        });
    };

    getUsers();
  }, [get, response, page, itemsPerPage]);

  useEffect(() =>
    addEventListener("onSelectMode", () => {
      setSelectMode((prev) => !prev);
    })
  );

  return (
    <>
      <TableHeader selectMode={selectMode} />
      <Box flex grow column sx={{ height: "100%", overflowY: "auto" }}>
        {(error && "Error!") || (loading && <Loading />) || (
          <Box grid templateColumns="1fr 1fr 1fr" sx={{ gap: 1, p: 1, py: 0 }}>
            {data?.products?.map((dictionary) => (
              <MyBox
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
