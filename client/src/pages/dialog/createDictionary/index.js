import {
  Box,
  Button,
  ButtonIcon,
  Icon,
  Input,
  Popover,
  Text,
} from "@components";
import { addEventListener } from "@utils";
import { useEffect } from "react";
import { Header } from "./header";

const Default = (props) => {
  //const iconData = useRef(null);

  useEffect(
    () =>
      addEventListener("dictionary/create/languageChoose", ({ detail }) => {
        console.log(detail);
      }),
    []
  );
  return (
    <Box
      flex
      column
      sx={{
        height: "700px",
        width: "500px",
        p: 2,
      }}
    >
      <Header />
      <Box className="createDictionary content" column flex>
        <Box flex ai jc="space-between" sx={{ py: 2 }}>
          <Box flex gap="20px" ai>
            <Icon icon="word" sx={{ ".span": { fontSize: "30px" } }} />
            <Input
              autoComplete="off"
              placeholder="Dictionary name"
              variant="standard"
              sx={{
                background: "transparent",
                border: "none",
                ".css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                  content: "none",
                },
                ".css-1eed5fa-MuiInputBase-root-MuiInput-root::after": {
                  content: "none",
                },
                ".css-nz481w-MuiInputBase-input-MuiInput-input": {
                  fontSize: "30px",
                },
              }}
            />
          </Box>
          <Popover
            button={<ButtonIcon icon="moreOptions" />}
            sxPopover={{ p: 0.5 }}
            sxButton={{ gap: 1 }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Button icon="edit" caption="Edit" variant="text" />
          </Popover>
        </Box>
      </Box>
      <Box flex ai gap="20px" sx={{ width: "100%" }}>
        <Text caption="Description" />
        <Input
          multiline
          placeholder="Your description is in here!"
          sx={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
};

export { Default as CreateDictionaryDialogContent };
