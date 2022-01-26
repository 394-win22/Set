import {React, useState} from "react";
import Header from "../components/Header";
import imgAccessories from "../images/img_acc.png";
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Col, Modal, Row } from "react-bootstrap";

import {
	useData,
	getItemsFromUser,
	getAllData,
	userId,
	getClothingItem,
	setData
} from "../utilities/firebase.js";

const Outfit = ({ outfit, id, index }) => {

	const [showModal, setShowModal] = useState(false);

	const [top, loadingTop, errorTop] = useData(
		getClothingItem("Tops", userId, outfit["Tops"]),
		getAllData
	);
	const [bottom, loadingBottom, errorBottom] = useData(
		getClothingItem("Bottoms", userId, outfit["Bottoms"]),
		getAllData
	);
	const [shoes, loadingShoes, errorShoes] = useData(
		getClothingItem("Shoes", userId, outfit["Shoes"]),
		getAllData
	);

	const [accessories, loadingAccessories, errorAccessories] = useData(
		getClothingItem("Accessories", userId, outfit["Accessories"]),
		getAllData
	);

	if (errorTop || errorBottom || errorShoes || errorAccessories)
		return <h1>{(errorTop, errorBottom, errorAccessories, errorShoes)}</h1>;
	if (loadingTop || loadingBottom || loadingShoes || loadingAccessories)
		return <h1>Loading...</h1>;

	const removeOutfit = () => {
		setData(`/Saved Outfits/${userId}/${id}`, null);
	}

	return (
		<>
			<div className="col-6 col-sm-4 col-md-3 py-3" onClick={() => {
				setShowModal(true)
			}
				}>
				<div className="card mb-4">
					<div>
						<div className="row">
							<div className="col-6">
								<img width="100%" src={top.image} alt={top.name} />
							</div>
							<div className="col-6">
							{accessories == null ? (
								<img
									width="100%"
									src={imgAccessories}
									alt="placeholderAccessory"
								/>
							) : (
								<img
									width="100%"
									src={accessories.image}
									alt={accessories.name}
								/>
							)}
							</div>
						</div>
						<div className="row">
							<div className="col-6">
								<img
									width="100%"
									src={bottom.image}
									alt={bottom.name}
								/>
							</div>
							<div className="col-6">
								<img
									width="100%"
									src={shoes.image}
									alt={shoes.name}
								/>
							</div>
						</div>
					</div>

					<div className="card-body">
						<p className="card-text">{`${outfit["Name"]} ${index + 1}`}</p>
						<div className="d-flex justify-content-between align-items-center">
							<div className="btn-group">
								<button
									type="button"
									className="btn btn-sm btn-outline-secondary"
									onClick={(ev) => {
										removeOutfit()
									}}
								>
									<DeleteOutlined />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<OutfitModal 
				show={showModal}
				onHide={() => setShowModal(false)}
				shoes={shoes}
				top={top}
				accessories={accessories}
				bottom={bottom}
			/>
		</>
	);
};

const OutfitModal = (props) => {
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<div className="col-6 col-sm-4 col-md-3 py-3">
					<div className="card mb-4">
						<div>
							<div className="row">
								<div className="col-6">
									<img width="100%" src={props.top.image} alt={props.top.name} />
								</div>
								<div className="col-6">
								{props.accessories == null ? (
									<img
										width="100%"
										src={imgAccessories}
										alt="placeholderAccessory"
									/>
								) : (
									<img
										width="100%"
										src={props.accessories.image}
										alt={props.accessories.name}
									/>
								)}
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<img
										width="100%"
										src={props.bottom.image}
										alt={props.bottom.name}
									/>
								</div>
								<div className="col-6">
									<img
										width="100%"
										src={props.shoes.image}
										alt={props.shoes.name}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

const OutfitsPage = () => {
	const [outfits, loadingOutfits, errorOutfits] = useData(
		getItemsFromUser(userId, "Saved Outfits")
	);

	if (errorOutfits) return <h1>{errorOutfits}</h1>;
	if (loadingOutfits) return <h1>Loading...</h1>;

	return (
		<div>
			<div className="container px-4">
				{!outfits ? (
					<p style={{ marginTop: "50%" }}>
						<center>No saved outfits to show.</center>
						<center>Click on the Create tab to style your first outfit.</center>
					</p>
				) : (
					<div className="album">
						<div className="row">
							{Object.entries(outfits).map(([key, outfit], index) => {
								return (
								<Outfit outfit={outfit} key={key} id={key} index={index}/>
							)})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OutfitsPage;
