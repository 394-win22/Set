import React, { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";

import { responsive } from "../../utilities/responsiveness.js";

// icons from https://www.flaticon.com/authors/bqlqn

import imgTops from "../../images/img_top.png";
import imgBottoms from "../../images/img_bottoms.png";
import imgShoes from "../../images/img_shoes.png";
import imgAccessories from "../../images/img_acc.png";

import "./OutfitDisplay.css";
import "react-multi-carousel/lib/styles.css";

export const currentOutfit = {
	accessories: null,
	tops: null,
	bottoms: null,
	shoes: null,
};

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
	const { onSelect, ...otherProps } = props;
	return (
		<Modal
			{...otherProps}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<ClothesCarousel clothes={props.clothes} type={props.type} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onSelect}>Select</Button>
			</Modal.Footer>
		</Modal>
	);
};

const ClothingItem = ({ obj, type, img }) => {
	const [showModal, setShowModal] = useState(false);
	const [displayImg, setDisplayImg] = useState(img);

	const setNewImg = () => {
		console.log(currentOutfit);
		setDisplayImg(Object.entries(obj)[currentOutfit[type]][1].image);
		setShowModal(false);
	};

	return (
		<>
			<Card className="p-2" onClick={() => setShowModal(true)}>
				<Card.Body style={{ textAlign: "center" }}>
					<img src={displayImg} width="100%" />
				</Card.Body>
			</Card>
			<ClothingModal
				show={showModal}
				onHide={() => setShowModal(false)}
				onSelect={() => setNewImg()}
				clothes={obj}
				type={type}
			/>
		</>
	);
};

const OutfitDisplay = ({ tops, bottoms, shoes, accessories }) => {
	return (
		<Container className="px-4">
			<Row xs={2} className="g-4">
				<Col>
					<ClothingItem
						obj={tops}
						type="tops"
						img={imgTops}
					></ClothingItem>
				</Col>
				<div className="col">
					<ClothingItem
						obj={accessories}
						type="accessories"
						img={imgAccessories}
					></ClothingItem>
				</div>
				<div className="col">
					<ClothingItem
						obj={bottoms}
						type="bottoms"
						img={imgBottoms}
					></ClothingItem>
				</div>
				<div className="col">
					<ClothingItem
						obj={shoes}
						type="shoes"
						img={imgShoes}
					></ClothingItem>
				</div>
			</Row>
		</Container>
	);
};

export default OutfitDisplay;
