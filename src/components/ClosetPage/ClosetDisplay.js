import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	DropdownButton,
	Dropdown,
	Modal,
} from "react-bootstrap";

import { userId, useData, getAllData } from "../../utilities/firebase.js";
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

const ClosetHeader = (props) => (
	<Container className="mx-0 px-0">
		<Row className="mx-auto text-center d-grid closet-header-btns mx-0">
			<NewItemForm />
			<FilterSelector setType={props.filterType} />
		</Row>
	</Container>
);

export const ClosetGrid = () => {
	const [closet, loading, error] = useData("/", getAllData);
	const [type, setType] = useState("Tops");

	if (error) return <h1>{error}</h1>;
	if (loading) return <h1>Loading closet...</h1>;

	return (
		<>
			<ClosetHeader filterType={setType} />
			<div className="container mt-6">
				<div className="album">
					<div className="row">
						{Object.entries(closet[type][userId]).map(
							([key, item]) => (
								<ClosetItem item={item} key={key} />
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export const ClosetItem = ({ item }) => {
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
					</Container>
				</Modal.Body>
			</Modal>
		</>
	);
};
