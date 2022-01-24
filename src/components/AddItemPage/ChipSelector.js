import React from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const ChipSelector = ({ items, legend, itemName, setItem}) => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
      },
    };
  
    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
  
    const theme = useTheme();
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setItem(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };
  
    return (
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="multiple-chip-label">{legend}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={itemName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={legend} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, itemName, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

export default ChipSelector;