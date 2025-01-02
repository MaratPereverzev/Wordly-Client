import { Box } from "shared/ui";
import { DataGridLayout, Footer, Toolbar } from "widgets/Dictionary/ui/Table";

const DictionariesList = () => {
  return <Box flex column grow>
      <Toolbar />
      <DataGridLayout />
      <Footer />
  </Box>
};

export default DictionariesList;
