import { styled } from "@mui/material";
import { MutableRefObject, useState } from "react";

import { Box, InputFile, ButtonGroup, Button } from "@/shared/ui";
import { DictionaryPostParams } from "@/shared/api/dictionary/model";

type HeaderProps = {
  dictionaryData: MutableRefObject<Partial<DictionaryPostParams>>
}

export const Header = ({ dictionaryData }: HeaderProps) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <StyledContainer className="createDictionary header">
      <img
        id="dictionaryBackground"
        style={{
          width: "100%",
          display: !selectedImage && "none",
          position: "absolute",
          backgroundSize: "cover",
        }}
        alt="ok"
      />
      {selectedImage ? (
        <ButtonGroup
          sx={{
            margin: 2,
            left: 0,
            top: 0,
            position: "absolute",
          }}
          color="inherit"
        >
          <InputFile
            sxText={{
              fontSize: "13px",
            }}
            /*
            onChange={(data) => {
              dictionaryData.current["media"] = data;
              setSelectedImage(data);
            }}
              */
          />
          <Button
            caption="Clear"
            sxText={{ fontSize: "13px" }}
            onClick={() => {
              const img = document.getElementById("dictionaryBackground")! as HTMLImageElement;
              img.src = "";
              setSelectedImage(null);
            }}
          />
        </ButtonGroup>
      ) : (
        <InputFile
          sxBox={{
            margin: 2,
            left: 0,
            top: 0,
            position: "absolute",
            display: "inline-block",
          }}
          sxText={{ fontSize: "13px" }}
          /*
          onChange={(data) => {
            dictionaryData.current.media = data;
            setSelectedImage(data);
          }}
            */
        />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "inline-block",
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  overflow: "hidden",
  height: "40%",
  "> div": {
    opacity: 0,
    transition: "opacity 150ms ease-in-out",
  },
  "&:hover > div": {
    opacity: 1,
  },
}));
