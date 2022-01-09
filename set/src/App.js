import React from 'react';
import './App.css';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import ItemList from './components/ItemDisplay'
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
  B: "Buttoms",
  S: "Shoes"
};

const FilterSelector = () => (
  <DropdownButton id="items-dropdown" variant="secondary" title="Filter By">
  {
    Object.values(types).map(
    type => <Dropdown.Item>{type}</Dropdown.Item>
    )
  }
  </DropdownButton>
);

function App() {
  return (
    <div>
      <Header />
      <div class="container">
        <div class="col-md-12 text-center">
      <FilterSelector />
      </div>
      </div>
      <ItemList items={ clothes.Tops } />
      <ItemList items={ clothes.Bottoms } />
      <ItemList items={ clothes.Shoes } />
      <Footer />
    </div>
  )
};

export default App;
