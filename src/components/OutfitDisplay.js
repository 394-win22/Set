import React, { useState } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-multi-carousel";

import { Button, Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { userId, setData } from "../utilities/firebase.js";
import { responsive } from "../utilities/responsiveness.js";

import { v4 as uuidv4 } from "uuid";

import Shirt from "../images/shirt.jpg";
import Pants from "../images/pants.jpg";
import Shoes from "../images/shoes.jpg";
import Accessories from "../images/accessories.jpg";

import "./OutfitDisplay.css";
import "react-multi-carousel/lib/styles.css";

const currentOutfit = { accessories: 0, tops: 0, bottoms: 0, shoes: 0 };
export const SavedOutfit = { accessories: 0, tops: 0, bottoms: 0, shoes: 0 };

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

export const ClothesCarousel = ({ clothes, type }) => {
	return (
		<Carousel
			afterChange={(previousSlide, { currentSlide, onMove }) => {
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

const ClothesModal = ({ obj, type, img }) => {
	const [showModal, setShowModal] = useState(false);
	const [displayImg, setDisplayImg] = useState(img);

	const setNewDisplay = () => {
		setDisplayImg(Object.entries(obj)[currentOutfit[type]][1].image);
		setShowModal(false);
	};

	return (
		<>
			<Button variant="primary" onClick={() => setShowModal(true)}>
				<img src={displayImg} width="100%"></img>
			</Button>
			<MyVerticallyCenteredModals
				show={showModal}
				onHide={() => setShowModal(false)}
				onSave={() => setNewDisplay()}
				clothes={obj}
				type={type}
			/>
		</>
	);
};

export const OutfitCarousel = ({ tops, bottoms, shoes, accessories }) => {
	return (
		<Container fluid>
			<div className="col-6 col-sm-4 col-md-3">
				<div>
					<div className="row">
						<div className="col-6">
							<ClothesModal
								obj={tops}
								type="tops"
								img={Shirt}
							></ClothesModal>
						</div>
						<div className="col-6">
							<ClothesModal
								obj={accessories}
								type="accessories"
								img={Accessories}
							></ClothesModal>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<ClothesModal
								obj={bottoms}
								type="bottoms"
								img={Pants}
							></ClothesModal>
						</div>
						<div className="col-6">
							<ClothesModal
								obj={shoes}
								type="shoes"
								img={Shoes}
							></ClothesModal>
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
				<Button onClick={props.onSave}>Save</Button>
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
