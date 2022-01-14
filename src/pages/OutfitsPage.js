import React from "react";
import Header from "../components/Header";
import Item from "../components/ItemDisplay";

import {
	useData,
	getRecommendationsFromUser,
	getAllData,
	userId,
} from "../utilities/firebase.js";

// outfit <= top
const Outfit = ({ outfit }) => {
	return (
		<div className="col-6 col-sm-4 col-md-3">
			<div className="card mb-4">
				<img
					className="card-img-top"
					src={outfit.image}
					alt={outfit.name}
				/>
				<div className="card-body">
					<p className="card-text">
						{outfit.name} by {item.brand}
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

const OutfitsPage = () => {
	const [recs, loadingRecs, errorRecs] = useData(
		getRecommendationsFromUser(userId),
		getAllData
	);

	return (
		<div>
			<Header />
			<div className="container">
				<div className="album">
					<div className="row">
						{/* {Object.entries(recs[userId]).map(([key, item]) => (
							<Item item={item} key={key} />
						))} */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OutfitsPage;
