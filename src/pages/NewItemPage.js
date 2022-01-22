import React, { useState } from "react";
import Header from "../components/Header";
import { storage } from "../utilities/firebase";
import { ref, uploadBytes } from "firebase/storage";
import HorizontalLinearStepper from "../components/Stepper";
import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
	Button,
	Col,
	DropdownButton,
	Dropdown,
	Container,
	Row,
  Form,
} from "react-bootstrap";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';

const itemTypes = ["Top", "Bottom", "Shoes", "Accessories"]
const colors = [
	"Brown",
	"Red",
	"Orange",
	"Yellow",
	"Green",
	"Blue",
	"Purple",
	"Black",
	"Pink",
	"Gray",
	"White",
	"Beige",
	"Gold",
	"Silver",
	"Multicolored",
];
const occasions = [
	"Business Casual",
	"Going Out",
	"Business Formal",
	"Everyday Wear",
	"Comfortable",
	"Black Tie",
];
const weathers = [
	"Sunny and Warm",
	"Hot and Humid",
	"Fall Breeze",
	"Winter Chill",
	"Rain",
	"Snow",
];
const FilterSelector = ({items, legend}) => {
    const [selectedItem, setItem] = React.useState('');

    const handleChange = (event) => {
        setItem(event.target.value);
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

const ChipSelector = ({items, legend}) => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
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
  const [itemName, setItem] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItem(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="multiple-chip-label">{legend}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={itemName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={legend} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
    </div>
  );
}

const weatherIcons = {
  "Sunny and Warm": "fas fa-sun fa-2x",
	"Hot and Humid": "fas fa-cloud-sun fa-2x",
	"Fall Breeze": "fas fa-wind fa-2x",
	"Winter Chill": "fas fa-icicles fa-2x",
	"Rain": "fas fa-cloud-showers-heavy fa-2x",
	"Snow": "fas fa-snowflake fa-2x",
}

const ButtonSelector = ({items, legend}) => {
    const [formats, setFormats] = React.useState(() => []);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    return (
    <>
    <Typography component="legend">{legend}</Typography>
    <ToggleButtonGroup
        color="primary"
        value={formats}
        onChange={handleFormat}
    >
        {
            Object.entries(items).map((pair, index) => (
                <ToggleButton value={pair[0]} key={index}>
                    <i className={pair[1]}></i>
                </ToggleButton>
            ))
        }
    </ToggleButtonGroup>
    </>
    )
}

const NewItemPage = () => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [type, setType] = useState("Tops");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload({blobUrl, name}) {
    if (!blobUrl || !name) return null;
    const blob = fetch(blobUrl).then((r) => r.blob())
    const storageRef = ref(storage, `/images/${name}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }

  return (
    <div>
      <Header />
      <Container>
      {/* <div>
        <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            filesLimit={1}
            // onChange={(files) => handleUpload({
            //     blobUrl: URL.createObjectURL(files[0]),
            //     name: `${file.name}_${Date.now()}`
            //   })}
        />
      </div> */}
      <Row className="justify-content-center">
        <TextField required id="standard-required" label="Item Name" variant="standard" className="mb-3"/>
        <TextField required id="standard-required" label="Link to Image" variant="standard" className="mb-3"/>
        <FilterSelector items={itemTypes} legend={"Item Type"} />
        <ButtonSelector items={weatherIcons} legend={"Weathers"} />
        <ChipSelector items={occasions} legend={"Occasions"} />
      </Row>
      {/* <HorizontalLinearStepper /> */}
      <Row>
        <Button size="large">Save</Button>
      </Row>
      </Container>
    </div>
  );
};

export default NewItemPage;
