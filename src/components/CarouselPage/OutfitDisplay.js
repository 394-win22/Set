import React, { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";

import { responsive } from "../../utilities/responsiveness.js";

import AlertTemplate from "react-alert-template-mui";
import { Provider as AlertProvider } from "react-alert";
import SaveButton from "./SaveButton";

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

const alertOptions = {
	position: "top center",
	timeout: 5000,
	offset: "130px",
	transition: "scale",
	type: "success",
};

const ClothesCarousel = ({ clothes, type, changeOutfit }) => {
	return (
		<Carousel
			afterChange={(previousSlide, { currentSlide, onMove }) => {
				changeOutfit(type, currentSlide);
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
				<ClothesCarousel clothes={props.clothes} type={props.type} changeOutfit={props.setOutfit} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onSelect}>Select</Button>
			</Modal.Footer>
		</Modal>
	);
};

const ClothingItem = ({ obj, type, img, setOutfit, currOutfit }) => {
	const [showModal, setShowModal] = useState(false);
	const [displayImg, setDisplayImg] = useState(img);

	const setNewImg = () => {
		let temp = currOutfit[type]
		setDisplayImg(Object.entries(obj)[temp][1].image);
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
				setOutfit={setOutfit}
			/>
		</>
	);
};

const OutfitDisplay = ({ tops, bottoms, shoes, accessories }) => {
	const [currOutfit, setCurrOutfit] = useState({
		"accessories": null,
		"tops": null,
		"bottoms": null,
		"shoes": null,
	});
	const changeOutfit = (type, currentSlide) => {
		setCurrOutfit((outfit) => {
			let temp = {...outfit};
			temp[type] = currentSlide;
			return temp
		})
	}
	return (
		<Container className="px-4">
			<Row xs={2} className="g-4">
				<Col>
					<ClothingItem
						obj={tops}
						type="tops"
						img={imgTops}
						setOutfit={changeOutfit}
						currOutfit={currOutfit}
					></ClothingItem>
				</Col>
				<div className="col">
					<ClothingItem
						obj={accessories}
						type="accessories"
						img={imgAccessories}
						setOutfit={changeOutfit}
						currOutfit={currOutfit}
					></ClothingItem>
				</div>
				<div className="col">
					<ClothingItem
						obj={bottoms}
						type="bottoms"
						img={imgBottoms}
						setOutfit={changeOutfit}
						currOutfit={currOutfit}
					></ClothingItem>
				</div>
				<div className="col">
					<ClothingItem
						obj={shoes}
						type="shoes"
						img={imgShoes}
						setOutfit={changeOutfit}
						currOutfit={currOutfit}
					></ClothingItem>
				</div>
			</Row>
			<Row xs={2} className="g-4">
				<Col>
					<AlertProvider template={AlertTemplate} {...alertOptions}>
						<SaveButton
							tops={tops}
							bottoms={bottoms}
							accessories={accessories}
							shoes={shoes}
							currOutfit={currOutfit}
						></SaveButton>
					</AlertProvider>
				</Col>
			</Row>
		</Container>
	);
};

export default OutfitDisplay;
