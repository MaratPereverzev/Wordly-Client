import { styled } from "@mui/material";
import { MutableRefObject, useState } from "react";

import { Box, InputFile, ButtonGroup, Button } from"@/shared/ui";
import { DictionaryPostParams } from"@/shared/api/dictionary/model";
import { FileData } from"@/shared/types";

type HeaderProps = {
  dictionaryData: MutableRefObject<Partial<DictionaryPostParams>>
}

export const Header = ({ dictionaryData }: HeaderProps) => {
  const [selectedImage, setSelectedImage] = useState<FileData | null>(null);

  return (
    <StyledContainer className="createDictionary header">
      <img
        id="dictionaryBackground"
        style={{
          width: "100%",
          display: !selectedImage ? "none" : "flex",
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const backgroundPhoto = document.getElementById(
                "dictionaryBackground"
              ) as HTMLImageElement;
              const reader = new FileReader();
              const file = event.target.files?.[0]!;

              reader.onloadend = () => {
                const data: FileData = {
                  caption: file.name,
                  data: file,
                  type: file.type,
                  preview: reader.result,
                };
                backgroundPhoto.src = data.preview as string;
                //if(onChange !== undefined) onChange(data);
                reader.readAsDataURL(file);
                dictionaryData.current.medium = data;
                setSelectedImage(data);
              }}
            } 
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const backgroundPhoto = document.getElementById(
              "dictionaryBackground"
            ) as HTMLImageElement;
            const reader = new FileReader();
            const file = event.target.files?.[0]!;

            reader.onloadend = () => {

              const data: FileData = {
                caption: file.name,
                data: file,
                type: file.type,
                preview: reader.result,
              };
              console.log(data.preview)
              backgroundPhoto.src = data.preview as string;
              //if(onChange !== undefined) onChange(data);
              
              dictionaryData.current.medium = data;
              setSelectedImage(data);
            }
            reader.readAsDataURL(file);
            }
          }
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
