import { usePutDictionarySettings } from "@/entities/Dictionary-settings/hooks/useDictionarySettings";
import { DictionaryInstance } from "@/shared/api/dictionary/model";
import { Box, Button, ButtonGroup } from "@/shared/ui";
import { useCallback, useEffect, useRef, useState } from "react";

type ResultType = {
  data: DictionaryInstance
}

export const Result = ({data: {medium, id, dictionarySetting}}: ResultType) => {
  const [isChangeMode, setIsChangeMode] = useState(false);
  const yCords = useRef(0);
  const [padding, setPadding] = useState(dictionarySetting?.padding ?? 0);

  const {mutate} = usePutDictionarySettings(id);

  const mouseMove = useCallback((e: MouseEvent) => {
    if(e.clientY - yCords.current > 0) setPadding(prev => prev = Math.max(prev - 1, 0));
    else setPadding(prev => (prev = Math.min(prev + 1, 100)));

    if(padding < 100 && padding > 0) yCords.current = e.clientY
  }, []);

  const mouseDown = useCallback((e: MouseEvent) => {
    yCords.current = e.clientY;
    document.addEventListener("mousemove", mouseMove);
  }, []);

  const mouseUp = useCallback(() => {
    document.removeEventListener("mousemove", mouseMove);
  }, [])

  useEffect(() => {
    if(isChangeMode) document.addEventListener("mousedown", mouseDown);
    else document.removeEventListener("mousedown", mouseDown);

    if(isChangeMode) document.addEventListener("mouseup", mouseUp);
    else document.removeEventListener("mouseup", mouseUp);

    return () => {
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mouseup", mouseUp);
    }
  }, [isChangeMode]);

  return (
    <Box sx={{position: "relative", userSelect: "none"}}>
      <img src={medium?.id ? `http://localhost:8080/api/media?id=${medium.id}` : "#"} style={{
        display: "block",
        objectFit: "cover",
        width: "100%",
        height: "350px",
        maxHeight: "350px",
        objectPosition: `center ${padding}%`,
        borderRadius: 1,
        }} 
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          position: "absolute",
          cursor: isChangeMode ? "move" : "default",
          ":hover": {
            opacity: 1
          },
          opacity: 0,
          width: "100%",
          height: "350px",
          transition: "150ms opacity ease-in-out"
        }}
      >
        <ButtonGroup
          sx={{
            margin: 2,
            left: 0,
            top: 0,
            position: "absolute",
          }}
          color="inherit"
        >
          <Button caption={isChangeMode ? "Save": "Switch"} onClick={() => {
            if(isChangeMode) {
              mutate({dictionaryId: +id, padding})
              setIsChangeMode(false)
            }
          }}/>
          <Button caption={isChangeMode ? "Cancel" : "Shift"} onClick={() => {
            setIsChangeMode(prev => !prev)
          }}/>
        </ButtonGroup>
      </Box>
    </Box>)
}