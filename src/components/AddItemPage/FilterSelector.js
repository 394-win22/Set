import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const FilterSelector = ({items, legend, selectedItem, setType}) => {
    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
    <FormControl fullWidth>
        <InputLabel id="legend">{legend}</InputLabel>
        <Select
            labelId="filter-select"
            id="filter-select"
            value={selectedItem}
            label={legend}
            onChange={handleChange}
    >
        {
            items.map((type, index) => (
                <MenuItem value={type} key={type}>{type}</MenuItem>
            ))
        }
    </Select>
    </FormControl>
);}

export default FilterSelector;