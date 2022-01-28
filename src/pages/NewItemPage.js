import React from "react";
import { Container } from "react-bootstrap";
import { NewItemForm } from "../components/ClosetPage/NewItemForm";

const NewItemPage = () => {
	return (
		<div>
			<Container>
				<NewItemForm />
			</Container>
		</div>
	);
};

export default NewItemPage;
