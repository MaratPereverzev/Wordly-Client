import { Input } from "../input";
import { Box } from "../box";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { dispatchEvent } from "@utils";

const Default = (props) => {
  const { itemsList, sx } = props;

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      value={value}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      onChange={(event, newValue) => {
        setValue(newValue);
        dispatchEvent("dictionary/create/languageChoose", { newValue });
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={itemsList ?? [{ language: "US", label: "American eng" }]}
      sx={{ ...sx, width: 300 }}
      renderInput={(params) => <Input {...params} label="Controllable" />}
      renderOption={(props, option) => {
        const { key, ...optionsProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2 } }}
            {...optionsProps}
          >
            <img
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.language.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.language.toLowerCase()}.png`}
              alt="flag"
            />
            {option.label}
          </Box>
        );
      }}
    />
  );
};

export { Default as AutoComplete };
