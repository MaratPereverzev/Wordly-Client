import { Table } from "./table";

const Default = (props) => {
  const selectedItems = new Map();

  return <Table selectedItems={selectedItems} itemsPerPage={4} />;
};

export { Default as Dictionaries };
