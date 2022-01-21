import React, { useState } from "react";
import Carousel from "react-multi-carousel";

import { Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { responsive } from "../../utilities/responsiveness.js";

import Shirt from "../../images/shirt.jpg";
import Pants from "../../images/pants.jpg";
import Shoes from "../../images/shoes.jpg";
import Accessories from "../../images/accessories.jpg";

import "./OutfitDisplay.css";
import "react-multi-carousel/lib/styles.css";

export const currentOutfit = { accessories: 0, tops: 0, bottoms: 0, shoes: 0 };

const ClothesCarousel = ({ clothes, type }) => {
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

const ClothingModal = (props) => {
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

const ClothingItem = ({ obj, type, img }) => {
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
			<ClothingModal
				show={showModal}
				onHide={() => setShowModal(false)}
				onSave={() => setNewDisplay()}
				clothes={obj}
				type={type}
			/>
		</>
	);
};

const OutfitDisplay = ({ tops, bottoms, shoes, accessories }) => {
	return (
		<Container fluid>
			<div className="col-6 col-sm-4 col-md-3">
				<div>
					<div className="row">
						<div className="col-6">
							<ClothingItem
								obj={tops}
								type="tops"
								img={Shirt}
							></ClothingItem>
						</div>
						<div className="col-6">
							<ClothingItem
								obj={accessories}
								type="accessories"
								img={Accessories}
							></ClothingItem>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<ClothingItem
								obj={bottoms}
								type="bottoms"
								img={Pants}
							></ClothingItem>
						</div>
						<div className="col-6">
							<ClothingItem
								obj={shoes}
								type="shoes"
								img={Shoes}
							></ClothingItem>
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

export default OutfitDisplay;
