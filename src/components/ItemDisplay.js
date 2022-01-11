import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

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

const FilterSelector = ({ setType }) => (
    <DropdownButton className='my-3' id="items-dropdown" variant="secondary" title="Filter By">
    {
        Object.values(types).map(
        type => <Dropdown.Item onClick={() => setType(type)}>{type}</Dropdown.Item>)
    }
    </DropdownButton>    
);

export const ItemList = (props) => {
    const [type, setType] = useState("Tops");
    console.log(props)
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
                { Object.values(props.closet[type][props.userId]).map(items => <Item item={ items } />) }
            </div>
        </div>
    </div>
    </>
    );
};

const Item = ({ item }) => (
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
);

export const RecommendDisplayBlock = (props) => {
    return (
        <RecommendDisplay top={ props.closet["Tops"][props.userId]["3a119c21f23d"] } bottom={props.closet["Bottoms"][props.userId]["f27c84fb4aab"] } shoes={ props.closet["Shoes"][props.userId]["343f44e3b186"] } accessory={ props.closet["Accessories"][props.userId]["08ffdbd3ad3a"] } />
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