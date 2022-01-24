import React, { useState } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { userId, useData, getAllData } from "../utilities/firebase.js";

const filterTypes = {
	T: "Tops",
	B: "Bottoms",
	S: "Shoes",
	A: "Accessories",
};

const FilterSelector = ({ setType }) => (
	<DropdownButton
		className="mb-3"
		id="items-dropdown"
		variant="secondary"
		title="Filter By "
	>
		{Object.values(filterTypes).map((type, index) => (
			<Dropdown.Item onClick={() => setType(type)} key={index}>
				{type}
			</Dropdown.Item>
		))}
	</DropdownButton>
);

export const ClosetGrid = () => {
	// User Specific Database functions
	const [closet, loading, error] = useData("/", getAllData);
	const [type, setType] = useState("Tops");
	if (error) return <h1>{error}</h1>;
	if (loading) return <h1>Loading closet...</h1>;
	return (
		<div className="container px-4">
			<div className="col-md-12 text-center">
				{/* <AddButton /> */}
				<FilterSelector setType={setType} />
			</div>
			<div className="album">
				<div className="row">
					{Object.entries(closet[type][userId]).map(([key, item]) => (
						<ClosetItem item={item} key={key} />
					))}
				</div>
			</div>
		</div>
	);
};

export const ClosetItem = ({ item }) => {
	return (
		<div className="col-6 col-sm-4 col-md-3 py-3">
			<div className="card">
				<img
					className="card-img-top"
					src={item.image}
					alt={item.name}
				/>
				<div className="card-body">
					<p className="card-text">{item.name}</p>
					{/* <div className="d-flex justify-content-between align-items-center">
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
					</div> */}
				</div>
			</div>
		</div>
	);
};
