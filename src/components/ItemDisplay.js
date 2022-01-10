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

const userCloset = {
    "Name": "William",
    "UserId": 1,
    "Closet": {
        "Tops": [
            {
                "name" : "Strong Together T-Shirt",
                "brand" : "Cinq à Sept",
                "color" : ["Gray"],
                "material" : "Cotton",
                "comfort": 7,
                "occasion" : ["Everyday Wear", "Comfortable"],
                "weather" : ["Sunny and Warm", "Hot and Humid", "Rain"],
                "audience" : "Women",
                "type" : "T-Shirt",
                "image" : "https://image.s5a.com/is/image/saks/0400012787086_HEATHERGREYWHITE"
            },
            {
                "name" : "Nora Floral Boxy T-Shirt",
                "brand" : "Leset",
                "color" : ["White", "Blue"],
                "material" : "Cotton",
                "comfort": 10,
                "occasion" : ["Everyday Wear", "Comfortable"],
                "weather" : ["Sunny and Warm", "Hot and Humid"],
                "audience" : "Women",
                "type" : "T-Shirt",
                "image" : "https://image.s5a.com/is/image/saks/0400014573744_WHITEBLUE"
            },
            {
                "name" : "Dive Cold-Shoulder Tee",
                "brand" : "LNA",
                "color" : ["Beige"],
                "material" : "Cotton",
                "comfort": 5,
                "occasion" : ["Everyday Wear", "Comfortable"],
                "weather" : ["Sunny and Warm", "Hot and Humid"],
                "audience" : "Women",
                "type" : "T-Shirt",
                "image" : "https://image.s5a.com/is/image/saks/0400014628136_SAND"
            }
        ],
        "Bottoms": [
            {
                "name" : "Le Jane Two-Tone Jeans",
                "brand" : "Frame",
                "color" : ["Blue"],
                "material": "Denim",
                "comfort": 4,
                "weather": ["Sunny and Warm", "Fall Breeze", "Winter Chill"],
                "occasion": ["Going Out", "Everyday Wear"],
                "audience" : "Women",
                "type" : "Jeans",
                "image" : "https://image.s5a.com/is/image/saks/0400015380808_DELLNOIR"
            },
            {
                "name" : "Trevor High-Rise Patchwork Jeans",
                "brand" : "Jonathan Simkhai Standard",
                "color" : ["Blue", "White"],
                "material": "Denim",
                "comfort": 6,
                "weather": ["Sunny and Warm", "Fall Breeze", "Winter Chill"],
                "occasion": ["Going Out", "Everyday Wear"],
                "audience" : "Women",
                "type" : "Jeans",
                "image" : "https://image.s5a.com/is/image/saks/0400015593348_SILVERLAKE"
            },
        ],
        "Shoes": [
            {
                "name" : "Leather Lug Sole Chelsea Boots",
                "brand" : "Prada",
                "color" : ["Black"],
                "material": "Leather",
                "comfort": 6,
                "weather": ["Fall Breeze", "Winter Chill"],
                "occasion": ["Going Out", "Everyday Wear", "Business Casual"],
                "audience" : "Women",
                "type" : "Boot",
                "image" : "https://image.s5a.com/is/image/saks/0400014408655_NERO"
            },
            {
                "name" : "Women's Suede Oversized Sneakers",
                "brand" : "Alexandar McQueen",
                "color" : ["White", "Black"],
                "material": "Suede",
                "comfort": 9,
                "weather": ["Sunny and Warm", "Hot and Humid", "Fall Breeze"],
                "occasion": ["Everyday Wear", "Comfortable"],
                "audience" : "Women",
                "type" : "Sneaker",
                "image" : "https://image.s5a.com/is/image/saks/0400010174918_WHITEBLACK"
            },
            {
                "name" : "Marmont Leather Thong Sandals With Double G",
                "brand" : "Gucci",
                "color" : ["Black", "Gold"],
                "material": "Leather",
                "comfort": 6,
                "weather": ["Sunny and Warm", "Hot and Humid"],
                "occasion": ["Everyday Wear", "Comfortable", "Going Out"],
                "audience" : "Women",
                "type" : "Sandal",
                "image" : "https://image.s5a.com/is/image/saks/0400096071331_BLACK"
            },
            {
                "name" : "Jolie Leather & Rabbit Fur Combat Boots",
                "brand" : "Montelliana 1965",
                "color" : ["Black", "White"],
                "material": "Leather",
                "comfort": 6,
                "weather": ["Winter Chill", "Fall Breeze", "Snow"],
                "occasion": ["Everyday Wear", "Comfortable", "Going Out", "Business Casual"],
                "audience" : "Women",
                "type" : "Boot",
                "image" : "https://image.s5a.com/is/image/saks/0400014622466_BLACK"    
            },
        ],
        "Accessories": [
            {
                "name" : "Faux Fur Pom-Pom Beanie",
                "brand" : "Moncler",
                "color" : ["Black"],
                "material": "Cotton",
                "comfort": 10,
                "weather": ["Winter Chill", "Fall Breeze", "Snow"],
                "occasion": ["Everyday Wear", "Comfortable"],
                "audience" : "Women",
                "type" : "Hat",
                "image" : "https://image.s5a.com/is/image/saks/0400015396959_BLACK?"
            },
        ],
    }
};

const types = {
    T: "Tops",
    B: "Bottoms",
    S: "Shoes",
    A: "Accessories"
};

const FilterSelector = ({ setType }) => (
    <>
    <div className="header-margin"></div>
    <DropdownButton id="items-dropdown" variant="secondary" title="Filter By">
    {
        Object.values(types).map(
        type => <Dropdown.Item onClick={() => setType(type)}>{type}</Dropdown.Item>)
    }
    </DropdownButton>
    </>
    
);

export const ItemList = () => {
    const [type, setType] = useState("Tops");
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
                { Object.values(userCloset.Closet[type]).map(items => <Item item={ items } />) }
            </div>
        </div>
    </div>
    </>
    );
};

const Item = ({ item }) => (
    <div className="col-6 col-sm-4 col-md-3 my-3">
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

export const RecommendDisplayBlock = () => {
    return (
        <RecommendDisplay top={ userCloset.Closet.Tops[1] } bottom={ userCloset.Closet.Bottoms[1] } shoes={ userCloset.Closet.Shoes[1] } accessory={ userCloset.Closet.Accessories[0] } />
    );
};

const RecommendDisplay = ({top, bottom, shoes, accessory}) => {
    return (
    <div class="container">
        <div class="row align-items-center">
            <div class="col">
            <div class="card text-white">
                <img class="card-img" src={accessory.image} alt={accessory.name} />
            </div>
            </div>

            <div class="col-6">
                <div class="row">
                <div class="card text-white">
                    <img class="card-img" src={top.image} alt={top.name} />
                </div>
                </div>
                <div class="row">
                <div class="card text-white mt-4">
                    <img class="card-img" src={bottom.image} alt={bottom.name} />
                </div>
                </div>
            </div>
            <div class="col">
                <div class="card text-white">
                    <img class="card-img" src={shoes.image} alt={shoes.name} />
                </div>
            </div>
        </div>
    </div>
    );
};