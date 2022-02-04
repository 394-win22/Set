import React from "react";

import { Button } from "react-bootstrap";
import { useAlert } from "react-alert";

import { pushData } from "../../utilities/firebase";

export const savedOutfit = { accessories: 0, tops: 0, bottoms: 0, shoes: 0 };

const saveOutfit = async (tops, bottoms, shoes, accessories, alert, currOutfit, UID) => {
	if (currOutfit["tops"] == null || currOutfit["bottoms"] == null || currOutfit["shoes"] == null) return;

	savedOutfit["tops"] = Object.entries(tops)[currOutfit["tops"]][0];
	savedOutfit["bottoms"] =
		Object.entries(bottoms)[currOutfit["bottoms"]][0];
	savedOutfit["shoes"] = Object.entries(shoes)[currOutfit["shoes"]][0];

	let accessorySelected = false;
	if (currOutfit["accessories"] != null){
		savedOutfit["accessories"] = Object.entries(accessories)[currOutfit["accessories"]][0];
		accessorySelected = true;
	}

	try {
		if (accessorySelected){
			await pushData(`/Saved Outfits/${UID}`, {
				Name: "Outfit",
				Accessories: savedOutfit["accessories"],
				Tops: savedOutfit["tops"],
				Shoes: savedOutfit["shoes"],
				Bottoms: savedOutfit["bottoms"],
			});
		} else {
			await pushData(`/Saved Outfits/${UID}`, {
				Name: "Outfit",
				Tops: savedOutfit["tops"],
				Shoes: savedOutfit["shoes"],
				Bottoms: savedOutfit["bottoms"],
			});
		}
	} catch (error) {
		alert.show(error);
	}
	alert.show("Outfit Saved");
	return;
};

const SaveButton = ({ tops, bottoms, shoes, accessories, currOutfit, UID }) => {
	const alert = useAlert();
	let render = false
	if (currOutfit["tops"] != null && currOutfit["bottoms"] != null && currOutfit["shoes"] != null){
		render = true
	}
	// Object.values(currOutfit).includes(null)
	return (
		<div className="mt-5 text-center">
			{/* <Button variant="dark" className="me-3">
				<i className="fas fa-random me-2"></i>Shuffle
			</Button> */}
			{!render ? (
				<Button variant="danger" disabled style = {{width: "80%"}}>
					<i className="fa fa-heart align-middle me-2"></i>Save
				</Button>
			) : (
				<Button
					onClick={(ev) => {
						saveOutfit(tops, bottoms, shoes, accessories, alert, currOutfit, UID);
					}}
					variant="danger"
					style = {{width: "80%"}}
				>
					<i className="fa fa-heart align-middle me-2"></i>Save
				</Button>
			)}
		</div>
	);
};

export default SaveButton;
