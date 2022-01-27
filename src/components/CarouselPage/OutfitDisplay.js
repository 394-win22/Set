import React, { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import AlertTemplate from "react-alert-template-mui";
import { Provider as AlertProvider } from "react-alert";
import SaveButton from "./SaveButton";
import {Container} from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from 'swiper';
// icons from https://www.flaticon.com/authors/bqlqn

import imgTops from "../../images/img_top.png";
import imgBottoms from "../../images/img_bottoms.png";
import imgShoes from "../../images/img_shoes.png";
import imgAccessories from "../../images/img_acc.png";

import "./OutfitDisplay.css";
import "react-multi-carousel/lib/styles.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"
import "swiper/css/pagination"

// import Swiper core and required modules
import SwiperCore, {
Navigation,Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

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
		<Swiper slidesPerView={3} spaceBetween={30} pagination={{
			"clickable": true
		  } } navigation={true} className="mySwiper"
		  centeredSlides={true} loop={true}
		  onRealIndexChange={ (swiper) => {console.log(swiper.realIndex);currentOutfit[type] = swiper.realIndex;}}>
			{Object.entries(clothes).map(([key, clothingItem], index) => {
				return (
					<SwiperSlide key={key} virtualIndex={index}>
						<img
							className="d-block w-100"
							src={clothingItem.image}
							alt={clothingItem.name}
						/>
					</SwiperSlide>
				);
			})}
		</Swiper>
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
				<Button variant="secondary" onClick={props.onSelect}>Select</Button>
			</Modal.Footer>
		</Modal>
	);
};

const ClothingItem = ({ obj, type, img, setOutfit, currOutfit }) => {
	const [showModal, setShowModal] = useState(false);
	const [displayImg, setDisplayImg] = useState(img);

	const setNewImg = () => {
		const currentSlide = currentOutfit[type]
		let temp = currentSlide
		//currOutfit[type]
		if(temp==null){
			setOutfit(type, 0)
			setDisplayImg(Object.entries(obj)[0][1].image);
			setShowModal(false);
		} else {
			setOutfit(type,currentSlide);
			setDisplayImg(Object.entries(obj)[temp][1].image);
			setShowModal(false);
		}
		
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
		<Container className="px-4" maxWidth="sm">
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
			<Row className="g-4">
			
					<AlertProvider template={AlertTemplate} {...alertOptions}>
						<SaveButton
							tops={tops}
							bottoms={bottoms}
							accessories={accessories}
							shoes={shoes}
							currOutfit={currOutfit}
						></SaveButton>
					</AlertProvider>
		
			</Row>
		</Container>
	);
};

export default OutfitDisplay;
