import { Box, ButtonIcon, Icon, Input, Popover, Text } from "@components";
import { useEffect, useRef, useCallback } from "react";
import { addEventListener } from "@utils";
import { usePostDictionary } from "@fetch";

const Default = (props) => {
  const dictionaryData = useRef({});
  const { post, response } = usePostDictionary();

  const postDictionary = useCallback(async () => {
    const newDictionary = await post({
      caption: dictionaryData.name,
      description: dictionaryData.description,
      userId: 6,
    });

    if (response.ok) console.log(newDictionary);
  }, [post, response]);

  useEffect(
    () =>
      addEventListener("onCreateDictionary", () => {
        postDictionary();
      }),
    [postDictionary]
  );
  return (
    <>
      <Box className="createDictionary content" column flex>
        <Box flex ai jc="space-between" sx={{ py: 2 }}>
          <Box flex gap="20px" ai>
            <Icon icon="word" sx={{ ".span": { fontSize: "30px" } }} />
            <Input
              name="name"
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
              onChange={(name) => (e) => {
                dictionaryData.current[name] = e.target.value;
              }}
            />
          </Box>
          <Popover
            button={<ButtonIcon icon="moreOptions" />}
            sxPopover={{ p: 1 }}
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
            <Text caption="Coming soon" />
          </Popover>
        </Box>
      </Box>
      <Box flex column sx={{ width: "100%" }} grow>
        <Box flex gap="20px" ai sx={{ width: "100%" }}>
          <Text caption="Description" />
          <Input
            name="description"
            multiline
            placeholder="Your description is in here!"
            fullWidth
            onChange={(name) => (e) => {
              dictionaryData.current[name] = e.target.value;
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export { Default as Content };
