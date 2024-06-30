import { Table } from "./table";

const Default = (props) => {
  /*
  import { Table } from "./table";
import { useFetch } from "use-http";

const itemsPerPage = 40;

const Default = (props) => {
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
    return addEventListener("onChangePage/dictionary", () => {
      getUsers();
    });
  }, [get, response, page, itemsPerPage]);

  return <Table itemsPerPage={itemsPerPage} loading={loading} error={error} />;
};

export { Default as Dictionaries };*/
  return <Table itemsPerPage={12} />;
};

export { Default as Dictionaries };
