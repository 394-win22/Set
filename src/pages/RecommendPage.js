import React from "react";
import Header from "../components/Header.js";
import {
	SwipeCard,
	ClothesCarousel,
	OutfitCarousel,
	SaveButton,
} from "../components/ItemDisplay";
import "./RecommendPage.css";
import {
	useData,
	getTopsFromUser,
	getBottomsFromUser,
	getRecommendationsFromUser,
	getAccessoriesFromUser,
	getShoesFromUser,
	getAllData,
	userId,
} from "../utilities/firebase.js";
import {
	Button,
	DropdownButton,
	Dropdown,
	Carousel,
	Container,
	Row,
} from "react-bootstrap";

const RecommendPage = () => {
	// get data from database
	const [recs, loadingRecs, errorRecs] = useData(
		getRecommendationsFromUser(userId),
		getAllData
	);
	const [tops, loadingTops, errorTops] = useData(
		getTopsFromUser(userId),
		getAllData
	);
	const [bottoms, loadingBottoms, errorBottoms] = useData(
		getBottomsFromUser(userId),
		getAllData
	);
	const [accessories, loadingAccessories, errorAccessories] = useData(
		getAccessoriesFromUser(userId),
		getAllData
	);
	const [shoes, loadingShoes, errorShoes] = useData(
		getShoesFromUser(userId),
		getAllData
	);
	// User Specific Database functions
	if (
		errorTops ||
		errorRecs ||
		errorBottoms ||
		errorAccessories ||
		errorShoes
	)
		return (
			<h1>
				{
					(errorTops,
					errorRecs,
					errorBottoms,
					errorAccessories,
					errorShoes)
				}
			</h1>
		);
	if (
		loadingTops ||
		loadingRecs ||
		loadingBottoms ||
		loadingAccessories ||
		loadingShoes
	)
		return <h1>Loading...</h1>;
	return (
		<div>
			<Header />
			<div>
				<OutfitCarousel
					tops={tops}
					bottoms={bottoms}
					accessories={accessories}
					shoes={shoes}
				/>
				<SaveButton
					tops={tops}
					bottoms={bottoms}
					accessories={accessories}
					shoes={shoes}
				></SaveButton>
			</div>
		</div>
	);
};

export default RecommendPage;
