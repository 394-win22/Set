import { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import AlertTemplate from "react-alert-template-mui";
import { Provider as AlertProvider } from "react-alert";
import SaveButton from "./SaveButton";
import {Container} from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react";

// icons from https://www.flaticon.com/authors/bqlqn
import imgTops from "../../images/img_top.png";
import imgBottoms from "../../images/img_bottoms.png";
import imgShoes from "../../images/img_shoes.png";
import imgAccessories from "../../images/img_acc.png";

import {isMobile} from 'react-device-detect';

import "./OutfitDisplay.css";
import "react-multi-carousel/lib/styles.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination";
import "swiper/css/navigation";


// import Swiper core and required modules
import SwiperCore, {
	FreeMode, EffectCoverflow, Mousewheel, Pagination, Navigation
} from 'swiper';

// install Swiper modules
SwiperCore.use([FreeMode, EffectCoverflow, Mousewheel, Pagination, Navigation]);

export const currentOutfit = {
	accessories: 0,
	tops: 0,
	bottoms: 0,
	shoes: 0,
};

export const currentOutfit2 = {
	accessories: 0,
	tops: 0,
	bottoms: 0,
	shoes: 0,
};

const alertOptions = {
	position: "top center",
	timeout: 5000,
	offset: "130px",
	transition: "scale",
	type: "success",
};

const filterTypes = {
	SW: "Sunny and Warm",
	H: "Hot and Humid",
	F: "Fall Breeze",
	W: "Winter Chill",
	R: "Rain",
	S: "Snow",
	C: "Clear Filter",
};

const ClothesCarousel = ({ clothes, type, changeOutfit }) => {
	if (isMobile) {
		return (
			<Swiper 
			// Responsive breakpoints
			breakpoints={{
				// when window width is >= 480px
				480: {
					slidesPerView: 3,
					spaceBetween: 30
				},
				// when window width is >= 640px
				640: {
					slidesPerView: 3,
					spaceBetween: 40
				}
			}}
			pagination={{
				type: "fraction",
			}}
			modules={[Pagination]}
			grabCursor={true} 
			mousewheel={{sensitivity:2}} 
			centeredSlides={true} 
			effect={'coverflow'} 
			slidesPerView={1} 
			spaceBetween={10}
			className={`swiper-${type}`}
			loop={true} 
			freeMode={{
				enabled: true,
				sticky: true,
			}}
			coverflowEffect={{
				"rotate": 30,
				"stretch": 0,
				"depth": 80,
				"modifier": 1,
				"slideShadows": true
			}}
			onInit={(swiper)=> {swiper.slideTo(currentOutfit[type]+swiper.activeIndex,0.5)}}
			onSlideChange={ (swiper) => {//If checking to avoid real indexing issues
				if (swiper.realIndex != swiper.activeIndex) {currentOutfit2[type] = swiper.realIndex;}}}>
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
	} else {
	return (
		<Swiper 
			// Responsive breakpoints
			breakpoints={{
				// when window width is >= 480px
				480: {
					slidesPerView: 3,
					spaceBetween: 30
				},
				// when window width is >= 640px
				640: {
					slidesPerView: 3,
					spaceBetween: 40
				}
			}}
			pagination={{
				type: "fraction",
			}}
			modules={[Pagination, Navigation]}
			navigation={true}
			grabCursor={true} 
			mousewheel={{sensitivity:2}} 
			centeredSlides={true} 
			effect={'coverflow'} 
			slidesPerView={1} 
			spaceBetween={10}
			className={`swiper-${type}`}
			loop={true} 
			freeMode={{
				enabled: true,
				sticky: true,
			}}
			coverflowEffect={{
				"rotate": 30,
				"stretch": 0,
				"depth": 80,
				"modifier": 1,
				"slideShadows": true
			}}
			onInit={(swiper)=> {swiper.slideTo(currentOutfit[type]+swiper.activeIndex,0.5)}}
			onSlideChange={ (swiper) => {//If checking to avoid real indexing issues
				if (swiper.realIndex != swiper.activeIndex) {currentOutfit2[type] = swiper.realIndex;}}}>
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
	);}
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
		// Swapping index position for saving the location
		currentOutfit[type] = currentOutfit2[type]
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

const OutfitHeader = (props) => (
	<Container className="mx-0 px-0">
		<Row className="mx-auto text-center d-grid closet-header-btns mx-0">
			<WeatherFilter setType={props.filterType} />
		</Row>
	</Container>
);

const OutfitDisplay = ({ tops, bottoms, shoes, accessories }) => {
	const [weatherType, setWeatherType] = useState("Clear Filter");
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
		<>
		<OutfitHeader filterType={setType} />
		<Container className="px-4" maxWidth="sm">
			<Row className="g-4">
				<WeatherFilter setType={"Clear Filter"}/>
			</Row>
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
	</>
	);
};

const WeatherFilter = (setType) => {
	return (
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
}

export default OutfitDisplay;
