import React, { useState } from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import FilterSelector from './inputs/FilterSelector'
import ChipSelector from './inputs/ChipSelector'
import ToggleButtonSelector from './inputs/ToggleButtonSelector'
import { useAlert, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'
import {SaveNewItem} from '../utilities/SaveNewItem';
import TextField from '@mui/material/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

import { storage, userId } from "../utilities/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

async function UploadOneImage(imageBlob, blobCategory, theUserID, uploadedURL) {
    if (!imageBlob || !blobCategory || !theUserID) return null;
    const storageRef = ref(storage, `/images/${theUserID}/${blobCategory}/${Date.now()}_${imageBlob["name"]}`);
    let snapshot = await uploadBytes(storageRef, imageBlob);
    let URL = await getDownloadURL(snapshot.ref);
    console.log('File available at', URL);
    return URL;
  }

const SubmitButton = ({ type, name, imageBlob, formats, itemName}) => {
    console.log(itemName);
    const alert = useAlert();
    return (
        <Button size="large" onClick={(evt) => 
            {UploadOneImage(imageBlob, type, userId)
                .then((URL) => SaveNewItem(type, name, URL, formats, itemName, alert));
            }}>
            Save
        </Button>
    )
}

export const NewItemForm = () => {
    const [name, setName] = useState("");
    const [imagelink, setImageLink] = useState("");
    const [type, setType] = useState('');
    const [occasions_Set, setOccasions] = useState([]);
    const [weathers, setWeathers] = useState(() => []);
    const [file, setFile] = useState(null);

    const options = {
        position: 'top center',
        timeout: 5000,
        offset: '130px',
        transition: 'scale',
        type: 'success',
    }
    return (
        <AlertProvider template={AlertTemplate} {...options}>
        <Container>
        <Row className="mb-3">
              <Col>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText={"Drag and drop an image here or click"}
                    filesLimit={1}
                    onChange={(files) => {console.log(files);if (files.length == 1) {console.log(files[0]["path"]);
                      setFile(files[0]);
                    }}}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <TextField id="outlined-required" label="Item Name" className="mb-3" onChange={(e) => {
                                                                                                    setName(e.target.value);
                                                                                                    }}/>
                </Row>
                {/* <Row>
                    <TextField required id="outlined-required" label="Link to Image" className="mb-3" onChange={(e) => {
                                                                                                    setImageLink(e.target.value);
                                                                                                    }}/>
                </Row> */}
                <Row className="mb-3">
                    <FilterSelector items={itemTypes} legend={"Item Type"} selectedItem={type} setType={setType} />
                </Row>
                <Row className="mb-3">
                    <ChipSelector items={occasions} legend={"Occasions"} itemName={occasions_Set} setItem={setOccasions} />
                </Row>
                <Row className="mb-3">
                    <ToggleButtonSelector items={weatherIcons} formats={weathers} setFormats={setWeathers} />
                </Row>
                <Row>
                    <SubmitButton type={type} name={name} imageBlob={file} formats={weathers} itemName={occasions}/>
                </Row>
            </Col>
        </Row>
      </Container>
      </AlertProvider>
    )
}