import { Table } from "./table";

export const Dictionaries = () => {
  const selectedItems = new Map();

  return <Table selectedItems={selectedItems} itemsPerPage={6} />;
};
