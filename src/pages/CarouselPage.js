import {React, useState} from "react";

import Header from "../components/Header";
import SaveButton from "../components/CarouselPage/SaveButton";
import OutfitDisplay from "../components/CarouselPage/OutfitDisplay";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-mui";

import { useData, getItemsFromUser, userId } from "../utilities/firebase.js";

const alertOptions = {
	position: "top center",
	timeout: 5000,
	offset: "130px",
	transition: "scale",
	type: "success",
};

const CarouselPage = () => {
	const [tops, loadingTops, errorTops] = useData(
		getItemsFromUser(userId, "Tops")
	);
	const [bottoms, loadingBottoms, errorBottoms] = useData(
		getItemsFromUser(userId, "Bottoms")
	);
	const [accessories, loadingAccessories, errorAccessories] = useData(
		getItemsFromUser(userId, "Accessories")
	);
	const [shoes, loadingShoes, errorShoes] = useData(
		getItemsFromUser(userId, "Shoes")
	);

	// const [currOutfit, setCurrOutfit] = useState({
	// 	accessories: null,
	// 	tops: null,
	// 	bottoms: null,
	// 	shoes: null,
	// });

	if (errorTops || errorBottoms || errorAccessories || errorShoes)
		return (
			<h1>{(errorTops, errorBottoms, errorAccessories, errorShoes)}</h1>
		);
	if (loadingTops || loadingBottoms || loadingAccessories || loadingShoes)
		return <h1>Loading...</h1>;

	return (
		<>
			<Header />
			<div>
				<OutfitDisplay
					tops={tops}
					bottoms={bottoms}
					accessories={accessories}
					shoes={shoes}
				/>
				{/* <AlertProvider template={AlertTemplate} {...alertOptions}>
					<SaveButton
						tops={tops}
						bottoms={bottoms}
						accessories={accessories}
						shoes={shoes}
					></SaveButton>
				</AlertProvider> */}
			</div>
		</>
	);
};

export default CarouselPage;
