import React, { useState, useEffect } from "react";

const db = [
	{
		name: "Richard Hendricks",
		url: "./img/richard.jpg",
	},
	{
		name: "Erlich Bachman",
		url: "./img/erlich.jpg",
	},
	{
		name: "Monica Hall",
		url: "./img/monica.jpg",
	},
	{
		name: "Jared Dunn",
		url: "./img/jared.jpg",
	},
	{
		name: "Dinesh Chugtai",
		url: "./img/dinesh.jpg",
	},
];

export const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

// For responsive design
const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
};

const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};
