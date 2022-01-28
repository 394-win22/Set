import React, { useState } from "react";
import {
	Button,
	Container,
	Row,
	DropdownButton,
	Dropdown,
	Modal,
	NavDropdown,
} from "react-bootstrap";
import { parse } from "uuid";
import { userId, useData, getAllData } from "../utilities/firebase.js";
import { NewItemForm } from "./NewItemForm.js";

const filterTypes = {
	T: "Tops",
	B: "Bottoms",
	S: "Shoes",
	A: "Accessories",
};

const FilterSelector = ({ setType }) => (
	<>
		{/* <NavDropdown title="Filter By" id="items-dropdown">
			{Object.values(filterTypes).map((type, index) => (
				<NavDropdown.Item onClick={() => setType(type)} key={index}>
					{type}
				</NavDropdown.Item>
			))}
		</NavDropdown> */}
		<DropdownButton
			id="items-dropdown"
			title="Filter By "
		>
			{Object.values(filterTypes).map((type, index) => (
				<Dropdown.Item onClick={() => setType(type)} key={index}>
					{type}
				</Dropdown.Item>
			))}
		</DropdownButton>
	</>
);

const ClosetHeader = (filterType) => (
	<div className="closet-header text-center">
		<NewItemForm />
		<FilterSelector setType={filterType} />
	</div>
);

export const ClosetGrid = () => {
	// User Specific Database functions
	const [closet, loading, error] = useData("/", getAllData);
	const [type, setType] = useState("Tops");
	if (error) return <h1>{error}</h1>;
	if (loading) return <h1>Loading closet...</h1>;
	return (
		<>
			<ClosetHeader filterType={setType} />
			<div className="container">
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
						{/* <div className="d-flex justify-content-between align-items-center">
							<div className="btn-group">
								<button
									type="button"
									className="btn btn-sm btn-outline-secondary"
								>
									View
								</button>
								<button
									type="button"
									className="btn btn-sm btn-outline-secondary"
								>
									Edit
								</button>
							</div>
							<small className="text-muted">{item.type}</small>
						</div> */}
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
					<img
						className="card-img-top"
						src={item.image}
						alt={item.name}
					/>
					<p style={{ fontSize: "20px", fontWeight: "bold" }}>
						<center>{item.name}</center>
					</p>
					<Container>
						<Row>Occasion: {parsed_occasion_string}</Row>
						<Row>Weather: {parsed_weather_string}</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</>
	);
};
