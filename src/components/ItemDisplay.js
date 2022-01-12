import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useData, getTopsFromUser, getAllData } from '../utilities/firebase.js';

const color = ["Brown", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black", "Pink", "Gray", "White", "Beige", "Gold", "Silver", "Multicolored"]
const material = ["Leather", "Wool", "Linen", "Silk", "Cotton", "Denim", "Polyester", "Flannel", "Sherpa", "Suede", "Sequins"]
const occasion = ["Business Casual", "Going Out", "Business Formal", "Everyday Wear", "Comfortable", "Black Tie"]
const weather = ["Sunny and Warm", "Hot and Humid", "Fall Breeze", "Winter Chill", "Rain", "Snow"]
const audience = ["Women", "Men", "Unisex", "Children"]

const topType = ["T-Shirt", "Blouse", "Crop Top", "Tank Top", "Sweater", "Long-sleeve T-shirt", "Button-down", "Bodysuit"]
const bottomType = ["Jeans", "Shorts", "Sweatpants", "Trousers", "Mini Skirt", "Maxi Skirt", "Midi Skirt", "Leggings"]
const shoeType = ["Sneakers", "Flats", "Boots", "Heels", "Loafers", "Sandals"]
const accessoryType = ["Hats", "Scarves", "Handbags"]

const types = {
    T: "Tops",
    B: "Bottoms",
    S: "Shoes",
    A: "Accessories"
};

// This is a hardcoded test user id
const userId = "C0XdX2OmOQZKzVknueo4xGtsgvI2"

const FilterSelector = ({ setType }) => (
    <DropdownButton className='my-3' id="items-dropdown" variant="secondary" title="Filter By">
    {
        Object.values(types).map(
        (type, index) => <Dropdown.Item onClick={() => setType(type)} key={index}>{type}</Dropdown.Item>)
    }
    </DropdownButton>    
);

export const ItemList = () => {
    // User Specific Database functions
    const [closet, loading, error] = useData('/', getAllData);
    const [type, setType] = useState("Tops");
    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading closet...</h1>;
    return (
        <>
        <div className="container">
            <div className="col-md-12 text-center">
                <FilterSelector setType={setType} />
            </div>
        </div>
        <div className="container">
        <div className="album">
            <div className="row">
                { Object.entries(closet[type][userId]).map(([key, item]) => <Item item={ item } key={key}/>) }
            </div>
        </div>
    </div>
    </>
    );
};

const Item = ({ item }) => {
    return(
    <div className="col-6 col-sm-4 col-md-3">
    <div className="card mb-4">
        <img className="card-img-top" src={ item.image } alt={ item.name }/>
            <div className="card-body">
                <p className="card-text">{ item.name } by { item.brand }</p>
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-muted">{ item.type }</small>
                    </div>
                </div>
            </div>
    </div>
    )
};

export const RecommendDisplayBlock = (props) => {
    // User Specific Database functions
    const [closet, loading, error] = useData('/', getAllData);
    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading closet...</h1>
    return (
        <RecommendDisplay top={ closet["Tops"][userId]["3a119c21f23d"] } bottom={closet["Bottoms"][userId]["f27c84fb4aab"] } shoes={ closet["Shoes"][userId]["343f44e3b186"] } accessory={ closet["Accessories"][userId]["08ffdbd3ad3a"] } />
    );
};

const RecommendDisplay = ({top, bottom, shoes, accessory}) => {
    return (
    <>
    <h1>
        
    </h1>
    <div className="container">
        <div className="row align-items-center mt-2">
            <div className="col">
            <div className="card text-white">
                <img className="card-img" src={accessory.image} alt={accessory.name} />
            </div>
            </div>

            <div className="col-6">
                <div className="row">
                <div className="card text-white">
                    <img className="card-img" src={top.image} alt={top.name} />
                </div>
                </div>
                <div className="row">
                <div className="card text-white mt-4">
                    <img className="card-img" src={bottom.image} alt={bottom.name} />
                </div>
                </div>
            </div>
            <div className="col">
                <div className="card text-white">
                    <img className="card-img" src={shoes.image} alt={shoes.name} />
                </div>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row text-center my-5">
        <div className="col">
            <button type="button" className="btn btn-warning btn-circle btn-xl"><i className="fa fa-times"></i>
            </button>
        </div>
        <div className="col align-items-right">
            <button type="button" className="btn btn-danger btn-circle btn-xl"><i className="fa fa-heart"></i>
            </button>
        </div>
        </div>
    </div>
    </>
    );
};