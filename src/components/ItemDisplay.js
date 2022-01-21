import React, { useState, useEffect, useMemo, useRef } from "react";
import {
	Button,
	Col,
	DropdownButton,
	Dropdown,
	Container,
	Row,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useData, getAllData, setData } from "../utilities/firebase.js";
import Carousel from "react-multi-carousel";
import { v4 as uuidv4 } from "uuid";
import Shirt from "../images/shirt.jpg";

import "./ItemDisplay.css";
import "react-multi-carousel/lib/styles.css";

import { useAlert } from "react-alert";

const options = {
	position: "bottom center",
	timeout: 500000,
	offset: "30px",
	transition: "scale",
};

const currentOutfit = { accessories: 0, tops: 0, bottoms: 0, shoes: 0 };
export const SavedOutfit = { accessories: 0, tops: 0, bottoms: 0, shoes: 0 };

const color = [
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
const material = [
	"Leather",
	"Wool",
	"Linen",
	"Silk",
	"Cotton",
	"Denim",
	"Polyester",
	"Flannel",
	"Sherpa",
	"Suede",
	"Sequins",
];
const occasion = [
	"Business Casual",
	"Going Out",
	"Business Formal",
	"Everyday Wear",
	"Comfortable",
	"Black Tie",
];
const weather = [
	"Sunny and Warm",
	"Hot and Humid",
	"Fall Breeze",
	"Winter Chill",
	"Rain",
	"Snow",
];
const audience = ["Women", "Men", "Unisex", "Children"];

const topType = [
	"T-Shirt",
	"Blouse",
	"Crop Top",
	"Tank Top",
	"Sweater",
	"Long-sleeve T-shirt",
	"Button-down",
	"Bodysuit",
];
const bottomType = [
	"Jeans",
	"Shorts",
	"Sweatpants",
	"Trousers",
	"Mini Skirt",
	"Maxi Skirt",
	"Midi Skirt",
	"Leggings",
];
const shoeType = ["Sneakers", "Flats", "Boots", "Heels", "Loafers", "Sandals"];
const accessoryType = ["Hats", "Scarves", "Handbags"];

const types = {
	T: "Tops",
	B: "Bottoms",
	S: "Shoes",
	A: "Accessories",
};

// This is a hardcoded test user id
const userId = "C0XdX2OmOQZKzVknueo4xGtsgvI2";

const FilterSelector = ({ setType }) => (
	<DropdownButton
		className="my-3"
		id="items-dropdown"
		variant="secondary"
		title="Filter By"
	>
		{Object.values(types).map((type, index) => (
			<Dropdown.Item onClick={() => setType(type)} key={index}>
				{type}
			</Dropdown.Item>
		))}
	</DropdownButton>
);

const AddButton = () => (
	<Button variant="secondary">Upload clothing item</Button>
);

export const ItemList = () => {
	// User Specific Database functions
	const [closet, loading, error] = useData("/", getAllData);
	const [type, setType] = useState("Tops");
	if (error) return <h1>{error}</h1>;
	if (loading) return <h1>Loading closet...</h1>;
	return (
		<>
			<div className="container">
				<div className="col-md-12 text-center">
					<AddButton />
					<FilterSelector setType={setType} />
				</div>
			</div>
			<div className="container">
				<div className="album">
					<div className="row">
						{Object.entries(closet[type][userId]).map(
							([key, item]) => (
								<Item item={item} key={key} />
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export const Item = ({ item }) => {
	return (
		<div className="col-6 col-sm-4 col-md-3">
			<div className="card mb-4">
				<img
					className="card-img-top"
					src={item.image}
					alt={item.name}
				/>
				<div className="card-body">
					<p className="card-text">
						{item.name} by {item.brand}
					</p>
					<div className="d-flex justify-content-between align-items-center">
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
					</div>
				</div>
			</div>
		</div>
	);
};

export const RecommendDisplayBlock = ({ top, bottom, shoes, accessory }) => {
	return (
		<RecommendDisplay
			top={top}
			bottom={bottom}
			shoes={shoes}
			accessory={accessory}
		/>
	);
};

const RecommendDisplay = ({ top, bottom, shoes, accessory }) => {
	return (
		<div className="row align-items-center mt-2">
			<div className="col">
				<div className="rec-card text-white">
					<img
						className="card-img"
						src={accessory.image}
						alt={accessory.name}
					/>
				</div>
			</div>

			<div className="col-lg-4 col-6">
				<div className="row">
					<div className="rec-card text-white">
						<img
							className="card-img"
							src={top.image}
							alt={top.name}
						/>
					</div>
				</div>
				<div className="row">
					<div className="rec-card text-white mt-4">
						<img
							className="card-img"
							src={bottom.image}
							alt={bottom.name}
						/>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="rec-card text-white">
					<img
						className="card-img"
						src={shoes.image}
						alt={shoes.name}
					/>
				</div>
			</div>
		</div>
	);
};

const db = [
	{
		name: "Richard Hendricks",
		url: "./img/richard.jpg",
	},
	{
		name: "Erlich Bachman",
		url: "./img/erlich.jpg",
	},
	{
		name: "Monica Hall",
		url: "./img/monica.jpg",
	},
	{
		name: "Jared Dunn",
		url: "./img/jared.jpg",
	},
	{
		name: "Dinesh Chugtai",
		url: "./img/dinesh.jpg",
	},
];

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

// For responsive design
const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
};

const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};

export const ClothesCarousel = ({ clothes, type }) => {
	return (
		<Carousel
			afterChange={(previousSlide, { currentSlide, onMove }) => {
				console.log(currentSlide);
				currentOutfit[type] = currentSlide;
			}}
			responsive={responsive}
			centerMode={true}
			infinite={false}
			showDots={true}
			focusOnSelect={true}
			removeArrowOnDeviceType={["mobile"]}
		>
			{Object.entries(clothes).map(([key, clothingItem], index) => {
				return (
					<div key={key}>
						<img
							className="d-block w-100"
							src={clothingItem.image}
							alt={clothingItem.name}
						/>
					</div>
				);
			})}
		</Carousel>
	);
};

export const OutfitCarousel = ({ tops, bottoms, shoes, accessories }) => {
	const [modalShow, setModalShow] = React.useState(false);
	const foo = () => {
		console.log("hello");
		setModalShow(false);
	};
	// console.log(Object.entries(tops)[currentOutfit["tops"]][1].image);
	return (
		<Container fluid>
			<div className="col-6 col-sm-4 col-md-3">
				<div>
					<div className="row">
						<div className="col-6">
							<>
								<Button
									variant="primary"
									onClick={() => setModalShow(true)}
								>
									<img src={Shirt} width="100%"></img>
								</Button>

								<MyVerticallyCenteredModals
									show={modalShow}
									onHide={
										() => foo()
										//console.log("HEREEEE")
										//console.log(tops[currentOutfit["tops"]])}
									}
									clothes={tops}
									type={"tops"}
								/>
							</>
						</div>
						<div className="col-6">
							<>
								<Button
									variant="primary"
									onClick={() => setModalShow(true)}
								>
									ACCESSORIES
								</Button>

								<MyVerticallyCenteredModals
									show={modalShow}
									onHide={() => foo()}
									clothes={accessories}
									type={"accessories"}
								/>
							</>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<>
								<Button
									variant="primary"
									onClick={() => setModalShow(true)}
								>
									BOTTOMS
								</Button>

								<MyVerticallyCenteredModals
									show={modalShow}
									onHide={() => foo()}
									clothes={bottoms}
									type={"bottoms"}
								/>
							</>
						</div>
						<div className="col-6">
							<>
								<Button
									variant="primary"
									onClick={() => setModalShow(true)}
								>
									SHOES
								</Button>

								<MyVerticallyCenteredModals
									show={modalShow}
									onHide={() => foo()}
									clothes={shoes}
									type={"shoes"}
								/>
							</>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);

	//<ClothesCarousel clothes={tops} type={"tops"} />

	// use this for shuffle button:
	// <button type="button" className="btn btn-dark btn-circle btn-xl">
	// 	<i className="fas fa-random"></i>
	// </button>;
};

const MyVerticallyCenteredModals = (props) => {
	// console.log("inside modal")
	// console.log(props.clothes)
	// console.log(props.type)
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<ClothesCarousel clothes={props.clothes} type={props.type} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Save</Button>
			</Modal.Footer>
		</Modal>
	);
};

export const SaveButton = ({ tops, bottoms, shoes, accessories }) => {
	const alert = useAlert();
	return (
		<Container>
			<Row className="justify-content-center mt-2">
				<Button
					onClick={(evt) => {
						saveOutfit(tops, bottoms, shoes, accessories, alert);
					}}
					type="button"
					className="btn btn-danger btn-circle btn-xl"
				>
					<i className="fa fa-heart align-middle"></i>
				</Button>
			</Row>
		</Container>
	);
};

const saveOutfit = async (tops, bottoms, shoes, accessories, alert) => {
	let newuuid = uuidv4();
	let parsed_uuid = newuuid.split("-");
	let length = parsed_uuid.length;
	let outfit_uuid = parsed_uuid[length - 1];

	SavedOutfit["tops"] = Object.entries(tops)[currentOutfit["tops"]][0];
	SavedOutfit["bottoms"] =
		Object.entries(bottoms)[currentOutfit["bottoms"]][0];
	SavedOutfit["shoes"] = Object.entries(shoes)[currentOutfit["shoes"]][0];
	SavedOutfit["accessories"] =
		Object.entries(accessories)[currentOutfit["accessories"]][0];

	// push to firebase here
	try {
		await setData(`/Saved Outfits/${userId}/${outfit_uuid}`, {
			Name: "Outfit",
			Accessories: SavedOutfit["accessories"],
			Tops: SavedOutfit["tops"],
			Shoes: SavedOutfit["shoes"],
			Bottoms: SavedOutfit["bottoms"],
		});
	} catch (error) {
		alert.show(error);
	}
	alert.show("Outfit Saved");
	return;
};
