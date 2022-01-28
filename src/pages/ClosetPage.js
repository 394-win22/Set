import React from "react";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-mui";

import { NewItemForm } from "../components/ClosetPage/NewItemForm";
import { ClosetGrid } from "../components/ClosetPage/ClosetDisplay";

const options = {
	position: "top center",
	timeout: 5000,
	offset: "130px",
	transition: "scale",
	type: "success",
};

const ClosetPage = () => {
	return (
		<AlertProvider template={AlertTemplate} {...options}>
			<div>
				<ClosetGrid />
			</div>
		</AlertProvider>
	);
};

export default ClosetPage;
