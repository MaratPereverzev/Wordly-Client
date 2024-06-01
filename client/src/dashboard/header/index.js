import { Box, IconButton } from "@components";
const Default = (props) => {
  return (
    <Box flex sx={{ border: "1px solid black" }}>
      <Box flex ai>
        <IconButton
          variant="text"
          icon="menu"
          sx={{ m: 1, borderRadius: "8px" }}
        />
      </Box>
      <Box flex ai grow sx={{ p: 1 }}>
        some text
      </Box>
      <Box flex ai grow jc="flex-end" sx={{ p: 1 }}>
        <IconButton
          icon="account"
          variant="text"
          sx={{ borderRadius: "8px" }}
        />
      </Box>
    </Box>
  );
};

export { Default as Header };
