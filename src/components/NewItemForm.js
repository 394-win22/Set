import React, { useState } from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import FilterSelector from './inputs/FilterSelector'
import ChipSelector from './inputs/ChipSelector'
import ToggleButtonSelector from './inputs/ToggleButtonSelector'
import { useAlert, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'
import {SaveNewItem} from '../utilities/SaveNewItem';
import TextField from '@mui/material/TextField';

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

const SubmitButton = ({ type, name, imagelink, formats, itemName }) => {
    const alert = useAlert();
    return (
        <Button size="large" onClick={(evt) => 
            {SaveNewItem(type, name, imagelink, formats, itemName, alert)}}>
            Save
        </Button>
    )
}

export const NewItemForm = () => {
    const [name, setName] = useState("");
    const [imagelink, setImageLink] = useState("");
    const [type, setType] = useState('');
    const [itemName, setItemName] = useState([]);
    const [formats, setFormats] = useState(() => []);
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
        <Row>
            <Col>
                <Row>
                    <TextField required id="outlined-required" label="Item Name" className="mb-3" onChange={(e) => {
                                                                                                    setName(e.target.value);
                                                                                                    }}/>
                </Row>
                <Row>
                    <TextField required id="outlined-required" label="Link to Image" className="mb-3" onChange={(e) => {
                                                                                                    setImageLink(e.target.value);
                                                                                                    }}/>
                </Row>
                <Row className="mb-3">
                    <FilterSelector items={itemTypes} legend={"Item Type"} selectedItem={type} setType={setType} />
                </Row>
                <Row className="mb-3">
                    <ChipSelector items={occasions} legend={"Occasions"} itemName={itemName} setItem={setItemName} />
                </Row>
                <Row className="mb-3">
                    <ToggleButtonSelector items={weatherIcons} formats={formats} setFormats={setFormats} />
                </Row>
                <Row>
                    <SubmitButton type={type} name={name} imagelink={imagelink} formats={formats} itemName={itemName}/>
                </Row>
            </Col>
        </Row>
      </Container>
      </AlertProvider>
    )
}