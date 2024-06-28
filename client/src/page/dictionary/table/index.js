import { Box } from "@components";
import { TableHeader } from "./header";
import { useEffect, useState } from "react";
import useFetch from "use-http";

const MyBox = (props) => {
  const { sx, ...other } = props;

  return (
    <Box
      flex
      center
      sx={{
        height: "10em",
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
    />
  );
};

const Default = (props) => {
  const [data, setData] = useState([]);

  const { get, loading, error, response } = useFetch("https://dummyjson.com");

  useEffect(() => {
    const getUsers = async () => {
      const dictionaries = await get("/products");

      if (response.ok)
        setData((prev) => {
          prev = dictionaries?.products;
          return prev;
        });
    };

    getUsers();
  }, [get, response]);

  return (
    <>
      <TableHeader />
      <Box
        grid
        templateColumns="1fr 1fr 1fr"
        sx={{ gap: 1, p: 1, paddingTop: 0, overflowY: "auto" }}
      >
        {error && "Error!"}
        {loading && "Loading..."}
        {data.map((dictionary) => (
          <MyBox key={dictionary.id}>{dictionary.title}</MyBox>
        ))}
      </Box>
    </>
  );
};

export { Default as Table };
