import { useState } from "react";
import {
	Container,
	Row,
	DropdownButton,
	Dropdown,
	Modal,
} from "react-bootstrap";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useData, getAllData, getAllClothingType, deleteData } from "../../utilities/firebase.js";
import { NewItemForm } from "./NewItemForm.js";

import "./ClosetDisplay.css";

const filterTypes = {
	T: "Tops",
	B: "Bottoms",
	S: "Shoes",
	A: "Accessories",
};

const FilterSelector = ({ setType }) => (
	<>
		<DropdownButton variant="closet" className="px-0" id="closet-header-dropdown" title="Filter By">
			{Object.values(filterTypes).map((type, index) => (
				<Dropdown.Item id="dropdown-closet" onClick={() => setType(type)} key={index}>
					{type}
				</Dropdown.Item>
			))}
		</DropdownButton>
	</>
);

const ClosetHeader = ({setType, UID}) => (
	<Container className="mx-0 px-0">
		<Row className="mx-auto text-center d-grid closet-header-btns mx-0">
			<NewItemForm UID={ UID } />
			<FilterSelector setType={setType} />
		</Row>
	</Container>
);

export const ClosetGrid = ({ UID }) => {
	const [type, setType] = useState("Tops");
	const [top, loadingTop, errorTop] = useData(
		getAllClothingType("Tops", UID),
		getAllData
	);
	const [bottom, loadingBottom, errorBottom] = useData(
		getAllClothingType("Bottoms", UID),
		getAllData
	);
	const [shoes, loadingShoes, errorShoes] = useData(
		getAllClothingType("Shoes", UID),
		getAllData
	);

	const [accessories, loadingAccessories, errorAccessories] = useData(
		getAllClothingType("Accessories", UID),
		getAllData
	);

	if (errorTop || errorBottom || errorShoes || errorAccessories)
		return <h1>{(errorTop, errorBottom, errorAccessories, errorShoes)}</h1>;
	if (loadingTop || loadingBottom || loadingShoes || loadingAccessories)
		return <h1>Loading...</h1>;

	const typesDict = {
		"Tops": top, 
		"Bottoms": bottom, 
		"Shoes": shoes,
		"Accessories": accessories
	};

	const ShowTypeofItems = () => { 
		if (typesDict[type] == null) {
			return <Container>
				<Row className="justify-content-center text-align-center text-center mt-5">
					No saved {type.toLowerCase()} to show.<br/>
					Click on the Add Clothing Item to add your first item.
				</Row>
			</Container>;}
		else {
			return Object.entries(typesDict[type]).map(
				([key, item]) => (
					<ClosetItem item={item} type={type} key={key} itemkey={key} UID={UID} />
				)
			)
		};
	}

	return (
		<>
			<ClosetHeader setType={setType} UID={ UID } />
			<div className="container mt-6">
				<div className="album">
					<div className="row">
						<ShowTypeofItems />
					</div>
				</div>
			</div>
		</>
	);
};

export const ClosetItem = ({ item, type, itemkey, UID }) => {
	const [showModal, setShowModal] = useState(false);
	let parsed_occasion_string = "";
	if (item.occasion != null) {
		let numOccasions = Object.entries(item.occasion).length;
		for (const occasion in item.occasion) {
			if (numOccasions == 1) {
				parsed_occasion_string += item.occasion[occasion];
			} else {
				parsed_occasion_string += item.occasion[occasion] + ", ";
			}
			numOccasions -= 1;
		}
	}

	let parsed_weather_string = "";
	if (item.weather != null) {
		let numWeather = Object.entries(item.weather).length;
		for (const weather in item.weather) {
			if (numWeather == 1) {
				parsed_weather_string += item.weather[weather];
			} else {
				parsed_weather_string += item.weather[weather] + ", ";
			}
			numWeather -= 1;
		}
	}
	const removeItem = () => {
		deleteData(`/${type}/${UID}/${itemkey}`);
	}

	return (
		<>
			<div
				className="col-6 col-sm-4 col-md-3 py-3"
				onClick={() => {
					setShowModal(true);
				}}
			>
				<div className="card">
					<img
						className="card-img-top"
						src={item.image}
						alt={item.name}
					/>
					<div className="card-body">
						<p className="card-text">{item.name}</p>
					</div>
				</div>
			</div>
			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<Container className="closet-modal">
					<img
						className="card-img-top"
						src={item.image}
						alt={item.name}
					/>
					<p className="closet-modal-item-name">{item.name}</p>
					<Container>
						<Row>Occasion: {parsed_occasion_string}</Row>
						<Row>Weather: {parsed_weather_string}</Row>
					</Container>
					<Row className="justify-content-middle my-3">
						<IconButton aria-label="delete" size="large" onClick={removeItem}>
							<DeleteIcon fontSize="inherit" />
						</IconButton>
					</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</>
	);
};
