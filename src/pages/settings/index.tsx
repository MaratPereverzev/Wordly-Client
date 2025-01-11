import { useTheme, Slider } from "@mui/material"

import { dispatchEvent } from "shared/utils"
import { Box, Button, ButtonGroup, Text } from "shared/ui"
import { useSidebarStore } from "@/app/store/sidebar";
import { useSettingsStore } from "entities/Settings/store";

const SettingsPage = () => {
  const theme = useTheme();

  const changeIconSize = useSettingsStore(state => state.changeIconSize)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    changeIconSize(newValue as number);
  };

  return <Box sx={{p: 1}} flex gap="40px">
    <ButtonGroup sx={{gap: 1, px: 1, border: `1px solid ${theme.palette.secondary.contrastText}`}}>
      <Box flex column center>
        <Button
          onClick={() => dispatchEvent("changeTheme", {theme: "light"})}
          sx={{ gap: "5px", color: "#FFAA00" }}
          variant="text"
          icon="light_mode"
        />
        <Text caption="Light" />
      </Box>
      <Box flex column center>
        <Button
          onClick={() => dispatchEvent("changeTheme", {theme: "system"})}
          sx={{ gap: "5px", color: "black" }}
          variant="text"
          icon="light_or_dark_mode"
        />
        <Text caption="System" />
      </Box>
      <Box flex column center>
        <Button
          onClick={() => dispatchEvent("changeTheme", {theme: "dark"})}
          sx={{ gap: "5px" }}
          variant="text"
          icon="dark_mode"
        />
        <Text caption="Dark" />
      </Box>
    </ButtonGroup>
    <Box sx={{width: "300px"}}>
      <Text caption="Icon size" />
      <Slider min={12} max={30} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" onChange={handleSliderChange} />
    </Box>
  </Box>
}

export default SettingsPage
