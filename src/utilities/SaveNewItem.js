import { pushData, userId } from "../utilities/firebase.js";

export const NewItem = {type: "", name: "", image: "", occasion: [], weather: [] };

function isURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export const SaveNewItem = async (itemType, itemName, imageLink, itemWeathers, itemOccasions, alert) => {
	if (itemName == "" || imageLink == "" || itemWeathers == [] || itemOccasions == []) {
        alert.show("An input is missing!");
        return;
    } else if (!isURL(imageLink)) {
        alert.show("Image URL format is incorrect!");
        return;
    }

	// push to firebase here
	try {
		await pushData(`/${itemType}/${userId}`, {
			name: itemName,
			image: imageLink,
            color: ["unknown"],
			weather: itemWeathers,
			occasion: itemOccasions,
		});
	} catch (error) {
		alert.show(error);
	}
	alert.show('Item Successfully Added');
	return;
};