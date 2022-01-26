import React, { useState } from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import FilterSelector from './AddItemPage/FilterSelector'
import ChipSelector from './AddItemPage/ChipSelector'
import ToggleButtonSelector from './AddItemPage/ToggleButtonSelector'
import { useAlert } from 'react-alert'
import {SaveNewItem} from '../utilities/SaveNewItem';
import TextField from '@mui/material/TextField';
import UploadOneImage from '../utilities/UploadOneImage'
import { userId } from "../utilities/firebase";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DropzoneArea } from 'mui-file-dropzone';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {isMobileSafari} from 'react-device-detect';

const itemTypes = ["Tops", "Bottoms", "Shoes", "Accessories"]
const occasions = [
	"Business Casual",
	"Going Out",
	"Business Formal",
	"Everyday Wear",
	"Comfortable",
	"Black Tie",
];
const weatherIcons = {
    "Sunny and Warm": "fas fa-sun fa-2x",
	"Hot and Humid": "fas fa-cloud-sun fa-2x",
	"Fall Breeze": "fas fa-wind fa-2x",
	"Winter Chill": "fas fa-icicles fa-2x",
	"Rain": "fas fa-cloud-showers-heavy fa-2x",
	"Snow": "fas fa-snowflake fa-2x",
}

export const NewItemForm = () => {
    const [name, setName] = useState("");
    const [imagelink, setImageLink] = useState("");
    const [type, setType] = useState('');
    const [occasions_Set, setOccasions] = useState([]);
    const [weathers, setWeathers] = useState(() => []);
    const [file, setFile] = useState(null);

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const alert = useAlert();
    let AddIconButton;
    if (isMobileSafari) {
        AddIconButton = () => (<Fab sx={{ zIndex: 1050, position: 'fixed', bottom: 'calc(80px + env(safe-area-inset-bottom))', right:  'calc(10% - 24px)' }}
        color="primary" 
        aria-label="add"
        onClick={handleClickOpen}>
        <AddIcon />
        </Fab>)
    } else {
        AddIconButton = () => (<Fab sx={{ zIndex: 1050, position: 'fixed', bottom: { xs: 240, sm: 80 }, right:  'calc(10% - 24px)' }}
        color="primary" 
        aria-label="add"
        onClick={handleClickOpen}>
        <AddIcon />
        </Fab>)
    }
    return (
        <div>
		<AddIconButton />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add</DialogTitle>
          <DialogContent>
            {/* <DialogContentText className="mb-2">
              To add new item to your closet, please upload an image and specify details.
            </DialogContentText> */}
        <Container>
        <Row className="mb-3">
              <Col>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Click here to upload..."}
                    filesLimit={1}
                    onChange={(files) => {
                        if (files.length == 1) {
                            setFile(files[0]);
                        }
                    }}
                    maxFileSize = {30000000}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <TextField id="outlined-required" label="Name" className="mb-3" onChange={(e) => {
                                                                                                    setName(e.target.value);
                                                                                                    }}/>
                </Row>
                {/* <Row>
                    <TextField required id="outlined-required" label="Link to Image" className="mb-3" onChange={(e) => {
                                                                                                    setImageLink(e.target.value);
                                                                                                    }}/>
                </Row> */}
                <Row className="mb-3">
                    <FilterSelector items={itemTypes} legend={"Type"} selectedItem={type} setType={setType} />
                </Row>
                <Row className="mb-3">
                    <ChipSelector items={occasions} legend={"Occasions"} itemName={occasions_Set} setItem={setOccasions} />
                </Row>
                <Row className="mb-3">
                    <ToggleButtonSelector items={weatherIcons} formats={weathers} setFormats={setWeathers} />
                </Row>
            </Col>
        </Row>
      </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button size="large" onClick={(evt) => 
                {handleClose();
                    UploadOneImage(file, type, userId)
                    .then((URL) => SaveNewItem(type, name, URL, weathers, occasions, alert)
                    .then(()=>{setName("");
                               setType("");
                               setOccasions([]);
                               setWeathers([]);
                               setFile(null);}));
            }}>
                Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}