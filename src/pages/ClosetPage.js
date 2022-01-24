import React from "react";
import Header from "../components/Header";
import { ItemList } from "../components/ItemDisplay";
import { NewItemForm } from "../components/NewItemForm"
import { useAlert, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'

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
			<Header />
			<ItemList />
			<NewItemForm />
		</div>
		</AlertProvider>
	);
};

export default ClosetPage;
