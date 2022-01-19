import React from "react";
import Header from "../components/Header.js";
import { OutfitCarousel, SaveButton } from "../components/ItemDisplay";
import "./RecommendPage.css";
import {
	useData,
	getTopsFromUser,
	getBottomsFromUser,
	getAccessoriesFromUser,
	getShoesFromUser,
	getAllData,
	userId,
} from "../utilities/firebase.js";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'

const options = {
	position: 'top center',
	timeout: 5000,
	offset: '130px',
	transition: 'scale',
	type: 'success',
  }

const CarouselPage = () => {
	// get data from database
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
	if (errorTops || errorBottoms || errorAccessories || errorShoes)
		return (
			<h1>{(errorTops, errorBottoms, errorAccessories, errorShoes)}</h1>
		);
	if (loadingTops || loadingBottoms || loadingAccessories || loadingShoes)
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
				<AlertProvider template={AlertTemplate} {...options}>
				<SaveButton
					tops={tops}
					bottoms={bottoms}
					accessories={accessories}
					shoes={shoes}
				></SaveButton>
				</AlertProvider>
			</div>
		</div>
	);
};

export default CarouselPage;
