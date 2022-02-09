import {useState, useEffect} from "react";
import imgAccessories from "../images/img_acc.png";
import { Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import {
	useData,
	getItemsFromUser,
	getAllData,
	getClothingItem,
	deleteData
} from "../utilities/firebase.js";

const Outfit = ({ outfit, id, index, UID }) => {

	const [showModal, setShowModal] = useState(false);

	const [top, loadingTop, errorTop] = useData(
		getClothingItem("Tops", UID, outfit["Tops"]),
		getAllData
	);
	const [bottom, loadingBottom, errorBottom] = useData(
		getClothingItem("Bottoms", UID, outfit["Bottoms"]),
		getAllData
	);
	const [shoes, loadingShoes, errorShoes] = useData(
		getClothingItem("Shoes", UID, outfit["Shoes"]),
		getAllData
	);

	const [accessories, loadingAccessories, errorAccessories] = useData(
		getClothingItem("Accessories", UID, outfit["Accessories"]),
		getAllData
	);

	if (errorTop || errorBottom || errorShoes || errorAccessories)
		return <h1>{(errorTop, errorBottom, errorAccessories, errorShoes)}</h1>;
	if (loadingTop || loadingBottom || loadingShoes || loadingAccessories)
		return <h1>Loading...</h1>;

	const removeOutfit = () => {
		console.log("called here")
		deleteData(`/Saved Outfits/${UID}/${id}`);
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
				removeoutfit={removeOutfit}
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
				<Row className="justify-content-middle my-3">
						<IconButton aria-label="delete" size="large" onClick={props.removeoutfit}>
							<DeleteIcon fontSize="inherit" />
						</IconButton>
				</Row>
			</Modal.Body>
		</Modal>
	);
};

const OutfitsPage = () => {
	const auth = getAuth();
	let [uid, setUID] = useState(null);
	let navigate = useNavigate();
	useEffect(() => {
		let authToken = sessionStorage.getItem('Auth Token')

		if (!authToken) {
			navigate('/login')
		}
	}, [navigate])
	onAuthStateChanged(auth, (authuser) => {
		if (authuser) {
		  	// The user's ID, unique to the Firebase project. Do NOT use
        	// this value to authenticate with the backend server
        	// Use User.getToken() instead.
        	setUID(authuser.uid);
		}
	  });

	const [outfits, loadingOutfits, errorOutfits] = useData(
		getItemsFromUser(uid, "Saved Outfits")
	);

	if (errorOutfits) return <h1>{errorOutfits}</h1>;
	if (loadingOutfits) return <h1>Loading...</h1>;

	return (
		<div>
			<div className="container px-4">
				{!outfits ? (
					<p style={{ marginTop: "30%" }}>
						<center>No saved outfits to show.</center>
						<center>Click on the Create tab to style your first outfit.</center>
					</p>
				) : (
					<div className="album">
						<div className="row">
							{Object.entries(outfits).sort(function(a,b) {
								return a.timestamp - b.timestamp;
								}).map(([key, outfit], index) => {
								return (
								<Outfit outfit={outfit} key={key} id={key} index={index} UID={uid} />
							)})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OutfitsPage;