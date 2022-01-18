import React from "react";
import Header from "../components/Header";
import Item from "../components/ItemDisplay";
import SavedOutfit from "../components/ItemDisplay";

import {
	useData,
	getOutfitsFromUser,
	getAllData,
	userId,
	getClothingItem,
} from "../utilities/firebase.js";

const Outfit = ({ outfit }) => {
	// get clothing items
	const [top, loadingTop, errorTop] = useData(
		getClothingItem("Tops", userId, outfit["Tops"]),
		getAllData
	);
	const [bottom, loadingBottom, errorBottom] = useData(
		getClothingItem("Bottoms", userId, outfit["Bottoms"]),
		getAllData
	);
	const [shoes, loadingShoes, errorShoes] = useData(
		getClothingItem("Shoes", userId, outfit["Shoes"]),
		getAllData
	);
	const [accessories, loadingAccessories, errorAccessories] = useData(
		getClothingItem("Accessories", userId, outfit["Accessories"]),
		getAllData
	);

	// error checking & loading
	if (errorTop || errorBottom || errorShoes || errorAccessories)
		return <h1>{(errorTop, errorBottom, errorAccessories, errorShoes)}</h1>;
	if (loadingTop || loadingBottom || loadingShoes || loadingAccessories)
		return <h1>Loading...</h1>;

	return (
		<div className="col-6 col-sm-4 col-md-3">
			<div className="card mb-4">
				<div>
					<div className="row">
						<div className="col-6">
							<img width="100%" src={top.image} alt={top.name} />
						</div>
						<div className="col-6">
							<img
								width="100%"
								src={accessories.image}
								alt={accessories.name}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<img
								width="100%"
								src={bottom.image}
								alt={bottom.name}
							/>
						</div>
						<div className="col-6">
							<img
								width="100%"
								src={shoes.image}
								alt={shoes.name}
							/>
						</div>
					</div>
				</div>

				<div className="card-body">
					<p className="card-text">Outfit</p>
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
					</div>
				</div>
			</div>
		</div>
	);
};

const OutfitsPage = () => {
	const [outfits, loadingOutfits, errorOutfits] = useData(
		getOutfitsFromUser(userId),
		getAllData
	);

	// User Specific Database functions
	if (errorOutfits) return <h1>{errorOutfits}</h1>;
	if (loadingOutfits) return <h1>Loading...</h1>;

	return (
		<div>
			<Header />
			<div className="container">
				<div className="album">
					<div className="row">
						{Object.entries(outfits).map(([key, outfit]) => (
							<Outfit outfit={outfit} key={key} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OutfitsPage;
