import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const clothes = {
    "Tops": {
        "Strong Together" : {
          "name" : "Strong Together T-Shirt",
          "brand" : "Cinq à Sept",
          "color" : ["grey"],
          "type" : "T-Shirt",
          "image" : "https://image.s5a.com/is/image/saks/0400012787086_HEATHERGREYWHITE"
        },
        "Nora Floral Boxy" : {
          "name" : "Nora Floral Boxy T-Shirt",
          "brand" : "Leset",
          "color" : ["white", "blue"],
          "type" : "T-Shirt",
          "image" : "https://image.s5a.com/is/image/saks/0400014573744_WHITEBLUE"
        },
        "Dive Cold-Shoulder Tee" : {
          "name" : "Dive Cold-Shoulder Tee",
          "brand" : "LNA",
          "color" : ["sand"],
          "type" : "T-Shirt",
          "image" : "https://image.s5a.com/is/image/saks/0400014628136_SAND"
        }
    },
    "Bottoms": {
      "Le Jane Two-Tone Jeans" : {
        "name" : "Le Jane Two-Tone Jeans",
        "brand" : "Frame",
        "color" : ["blue"],
        "type" : "Jeans",
        "image" : "https://image.s5a.com/is/image/saks/0400015380808_DELLNOIR"
      },
      "Trevor High-Rise Patchwork Jeans" : {
        "name" : "Trevor High-Rise Patchwork Jeans",
        "brand" : "Jonathan Simkhai Standard",
        "color" : ["blue", "white"],
        "type" : "T-Shirt",
        "image" : "https://image.s5a.com/is/image/saks/0400015593348_SILVERLAKE"
      },
    },
    "Shoes": {
      "Leather Lug Sole Chelsea Boots" : {
        "name" : "Leather Lug Sole Chelsea Boots",
        "brand" : "Prada",
        "color" : ["black"],
        "type" : "Boot",
        "image" : "https://image.s5a.com/is/image/saks/0400014408655_NERO"
      },
      "Women's Suede Oversized Sneakers" : {
        "name" : "Women's Suede Oversized Sneakers",
        "brand" : "Alexandar McQueen",
        "color" : ["white", "black"],
        "type" : "Sneaker",
        "image" : "https://image.s5a.com/is/image/saks/0400010174918_WHITEBLACK?"
      },
      "Marmont Leather Thong Sandals With Double G" : {
        "name" : "Marmont Leather Thong Sandals With Double G",
        "brand" : "Gucci",
        "color" : ["black", "gold"],
        "type" : "Sandal",
        "image" : "https://image.s5a.com/is/image/saks/0400096071331_BLACK?"
    }
  }
};

const types = {
    T: "Tops",
    B: "Bottoms",
    S: "Shoes"
};

const FilterSelector = ({ type, setType }) => (
    <DropdownButton id="items-dropdown" variant="secondary" title="Filter By">
    {
        Object.values(types).map(
        type => <Dropdown.Item onClick={() => setType(type)}>{type}</Dropdown.Item>)
    }
    </DropdownButton>
);

const ItemList = () => {
    const [type, setType] = useState("Tops");
    return (
        <>
        <div className="container">
            <div className="col-md-12 text-center">
                <FilterSelector type={type} setType={setType} />
            </div>
        </div>
        <div className="container">
        <div className="album py-5">
            <div className="row">
                { Object.values(clothes[type]).map(items => <Item item={ items } />) }
            </div>
        </div>
    </div>
    </>
    );
};

const Item = ({ item }) => (
    <div className="col-md-4">
    <div className="card mb-4 box-shadow">
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

export default ItemList;