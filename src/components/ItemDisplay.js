import React, { useState, useMemo, useRef } from "react";
import { DropdownButton, Dropdown, Carousel, Container, Row } from "react-bootstrap";
import { useData, getAllData } from "../utilities/firebase.js";
import TinderCard from "react-tinder-card";
import './ItemDisplay.css';

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
					<FilterSelector setType={setType} />
				</div>
			</div>
			<div className="container">
				<div className="album">
					<div className="row">
						{Object.entries(closet[type][userId]).map(([key, item]) => (
							<Item item={item} key={key} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

const Item = ({ item }) => {
	return (
		<div className="col-6 col-sm-4 col-md-3">
			<div className="card mb-4">
				<img className="card-img-top" src={item.image} alt={item.name} />
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

export const RecommendDisplayBlock = ({top,bottom,shoes,accessory}) => {
	return (
		<RecommendDisplay
			top={top}
			bottom={bottom}
			shoes={shoes}
			accessory={accessory}
		/>
	);
};

const RecommendDisplay = ({ top, bottom, shoes, accessory}) => {
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
						<img className="card-img" src={top.image} alt={top.name} />
					</div>
				</div>
				<div className="row">
					<div className="rec-card text-white mt-4">
						<img className="card-img" src={bottom.image} alt={bottom.name} />
					</div>
				</div>
			</div>
			<div className="col">
				<div className="rec-card text-white">
					<img className="card-img" src={shoes.image} alt={shoes.name} />
				</div>
			</div>
		</div>
	);
};

const db = [
    {
      name: 'Richard Hendricks',
      url: './img/richard.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: './img/erlich.jpg'
    },
    {
      name: 'Monica Hall',
      url: './img/monica.jpg'
    },
    {
      name: 'Jared Dunn',
      url: './img/jared.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: './img/dinesh.jpg'
    }
  ]

export const ClothesCarousel = ({clothes}) => {
    return (
        <Container fluid>
            <Row className="carousel-container">
                <Carousel variant="dark" interval={null} indicators={false}>
                    {Object.entries(clothes).map(([key, clothingItem], index) => {
                                return (
                                    <Carousel.Item key={key}>
                                        <img
                                            className="d-block w-100"
                                            src={clothingItem.image}
                                            alt={clothingItem.name}
                                            />
                                    </Carousel.Item>
                                )
                        })
                    }
                </Carousel>
            </Row>
        </Container>
    )
}

export const OutfitCarousel = ({ tops, bottoms, shoes, accessories}) => {
	return (
		<div className="row justify-content-center mt-2">
			<button
							type="button"
							className="btn btn-dark btn-circle btn-xl"
						>
							<i class="fas fa-random"></i>
			</button>
			<div className="col-lg-4 col-6">
				<div className="row">
					<div className="rec-card text-white">
                        <ClothesCarousel clothes={accessories} />
					</div>
				</div>
				<div className="row">
					<div className="rec-card text-white">
                        <ClothesCarousel clothes={tops} />
					</div>
				</div>
				<div className="row">
					<div className="rec-card text-white mt-4">
                        <ClothesCarousel clothes={bottoms} />
					</div>
				</div>
				<div className="row">
					<div className="rec-card text-white">
                        <ClothesCarousel clothes={shoes} />
					</div>
				</div>
			</div>
			<button
							type="button"
							className="btn btn-danger btn-circle btn-xl"
              >
              <i className="fa fa-heart align-middle"></i>
       		 </button>
		</div>
	);
};

export const SwipeCard = ({recs, shoes, tops, bottoms, accessories}) => {
    const recLength = Object.keys(recs).length;
    const [currentIndex, setCurrentIndex] = useState(recLength - 1);
	const [lastDirection, setLastDirection] = useState();
    
    // used for outOfFrame closure
	const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
		() =>
			Array(recLength)
				.fill(0)
				.map((i) => React.createRef()),
		[]
	);

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canGoBack = currentIndex < recLength - 1;

	const canSwipe = currentIndex >= 0;

	// set last direction and decrease current index
	const swiped = (direction, nameToDelete, index) => {
		setLastDirection(direction);
		updateCurrentIndex(index - 1);
	};

	const outOfFrame = (name, idx) => {
		console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
		// handle the case in which go back is pressed before card goes outOfFrame
		currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
	};

	const swipe = async (dir) => {
		if (canSwipe && currentIndex < recLength) {
			await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
		}
	};

	// increase current index and show card
	const goBack = async () => {
		if (!canGoBack) return;
		const newIndex = currentIndex + 1;
		updateCurrentIndex(newIndex);
		await childRefs[newIndex].current.restoreCard();
	};

    return (
		<div>
			<div className="cardContainer">
				{Object.entries(recs).map(([key, rec], index) => (
					<TinderCard
						ref={childRefs[index]}
						className="swipe"
						key={index}
						onSwipe={(dir) => swiped(dir, rec, index)}
						onCardLeftScreen={() => outOfFrame(key, index)}
					>
						<div className="rec-card-block container">
							<RecommendDisplayBlock top={tops[rec.top]} bottom={bottoms[rec.bottom]} accessory={accessories[rec.accessory]} shoes={shoes[rec.shoes]} />
						</div>
					</TinderCard>
				))}
			</div>
			<div className="rec-buttons container">
				<div className="row text-center my-5">
					<div className="col">
						<button
                            style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
							type="button"
							className="btn btn-warning btn-circle btn-xl"
							onClick={() => goBack("left")}
						>
							<i className="fas fa-undo align-middle"></i>
						</button>
					</div>
					<div className="col align-items-middle">
						<button
							style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
							type="button"
							className="btn btn-warning btn-circle btn-xl"
							onClick={() => swipe("left")}
						>
							<i className="fa fa-times align-middle"></i>
						</button>
					</div>
					<div className="col align-items-right">
						<button
							style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
							type="button"
							className="btn btn-danger btn-circle btn-xl"
							onClick={() => swipe("right")}
						>
							<i className="fa fa-heart align-middle"></i>
						</button>
					</div>
				</div>
			</div>
			{lastDirection ? (
				<h2 key={lastDirection} className="infoText">
					You swiped {lastDirection}
				</h2>
			) : (
				<h2 className="infoText"></h2>
			)}
		</div>
	);
};
