import React from "react";

import { Button, Container, Row } from "react-bootstrap";
import { useAlert } from "react-alert";
import { v4 as uuidv4 } from "uuid";

import { currentOutfit } from "./OutfitDisplay";
import { userId, setData } from "../../utilities/firebase";

export const savedOutfit = { accessories: 0, tops: 0, bottoms: 0, shoes: 0 };

const saveOutfit = async (tops, bottoms, shoes, accessories, alert) => {
	let newuuid = uuidv4();
	let parsed_uuid = newuuid.split("-");
	let length = parsed_uuid.length;
	let outfit_uuid = parsed_uuid[length - 1];

	savedOutfit["tops"] = Object.entries(tops)[currentOutfit["tops"]][0];
	savedOutfit["bottoms"] =
		Object.entries(bottoms)[currentOutfit["bottoms"]][0];
	savedOutfit["shoes"] = Object.entries(shoes)[currentOutfit["shoes"]][0];
	savedOutfit["accessories"] =
		Object.entries(accessories)[currentOutfit["accessories"]][0];

	try {
		await setData(`/Saved Outfits/${userId}/${outfit_uuid}`, {
			Name: "Outfit",
			Accessories: savedOutfit["accessories"],
			Tops: savedOutfit["tops"],
			Shoes: savedOutfit["shoes"],
			Bottoms: savedOutfit["bottoms"],
		});
	} catch (error) {
		alert.show(error);
	}
	alert.show("Outfit Saved");
	return;
};

const SaveButton = ({ tops, bottoms, shoes, accessories }) => {
	const alert = useAlert();
	return (
		<div className="mt-5 text-center">
			{/* <Button variant="dark" className="me-3">
				<i className="fas fa-random me-2"></i>Shuffle
			</Button> */}
			<Button
				onClick={(ev) => {
					saveOutfit(tops, bottoms, shoes, accessories, alert);
				}}
				variant="danger"
			>
				<i className="fa fa-heart align-middle me-2"></i>Save
			</Button>
		</div>
	);
};

export default SaveButton;
