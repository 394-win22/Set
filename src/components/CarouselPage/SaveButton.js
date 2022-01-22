import React from "react";

import { Button, Container, Row } from "react-bootstrap";
import { useAlert } from "react-alert";
import { v4 as uuidv4 } from "uuid";

import { currentOutfit } from "./OutfitDisplay";
import { userId, setData } from "../../utilities/firebase";

export const savedOutfit = { accessories: 0, tops: 0, bottoms: 0, shoes: 0 };

const saveOutfit = async (tops, bottoms, shoes, accessories, alert, currOutfit) => {
	if (Object.values(currOutfit).includes(null)) return;

	let newuuid = uuidv4();
	let parsed_uuid = newuuid.split("-");
	let length = parsed_uuid.length;
	let outfit_uuid = parsed_uuid[length - 1];

	savedOutfit["tops"] = Object.entries(tops)[currOutfit["tops"]][0];
	savedOutfit["bottoms"] =
		Object.entries(bottoms)[currOutfit["bottoms"]][0];
	savedOutfit["shoes"] = Object.entries(shoes)[currOutfit["shoes"]][0];
	savedOutfit["accessories"] =
		Object.entries(accessories)[currOutfit["accessories"]][0];

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

const SaveButton = ({ tops, bottoms, shoes, accessories, currOutfit }) => {
	const alert = useAlert();
	return (
		<div className="mt-5 text-center">
			{/* <Button variant="dark" className="me-3">
				<i className="fas fa-random me-2"></i>Shuffle
			</Button> */}
			{Object.values(currOutfit).includes(null) ? (
				<Button variant="danger" disabled style = {{width: "80%"}}>
					<i className="fa fa-heart align-middle me-2"></i>Save
				</Button>
			) : (
				<Button
					onClick={(ev) => {
						saveOutfit(tops, bottoms, shoes, accessories, alert, currOutfit);
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
