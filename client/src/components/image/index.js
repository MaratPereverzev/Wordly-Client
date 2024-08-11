import { Box } from "../box";
import axios from "axios";

const Default = (props) => {
  const { url } = props;
  const fileReader = new FileReader();
  const response = axios.get(url, {});
  return <Box></Box>;
};
export { Default as Image };
