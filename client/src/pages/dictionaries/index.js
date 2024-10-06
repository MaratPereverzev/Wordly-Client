import { Table } from "./table";

const Default = (props) => {
  const selectedItems = new Map();

  return <Table selectedItems={selectedItems} itemsPerPage={6} />;
};

export { Default as Dictionaries };
