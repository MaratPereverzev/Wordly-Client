import { Table } from "./table";

const Dictionaries = () => {
  const selectedItems = new Map();

  return <Table selectedItems={selectedItems} itemsPerPage={6} />;
};

export default Dictionaries;
