import React from "react";
import Header from "../components/Header";
import { NewItemForm } from "../components/NewItemForm"
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'
import { ClosetGrid } from "../components/ClosetDisplay";

const options = {
	position: 'top center',
	timeout: 5000,
	offset: '130px',
	transition: 'scale',
	type: 'success',
}

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
