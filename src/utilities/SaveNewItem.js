
import { v4 as uuidv4 } from "uuid";
import { setData, userId } from "../utilities/firebase.js";

const SaveNewItem = async (itemType, itemName, imageLink, itemWeathers, itemOccasions, alert) => {
	let newuuid = uuidv4();
	let parsed_uuid = newuuid.split("-");
	let length = parsed_uuid.length;
	let item_uuid = parsed_uuid[length - 1];

	// push to firebase here
	try {
		await setData(`/${itemType}/${userId}/${item_uuid}`, {
			Name: itemName,
			image: imageLink,
			weather: itemWeathers,
			occasion: itemOccasions,
		});
	} catch (error) {
		alert.show(error);
	}
	alert.show('Outfit Saved');
	return;
};

export default SaveNewItem;