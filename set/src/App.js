import React from 'react';
import './App.css';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import TopList from './components/Top.js'

const clothes = {
  "tops": {
      "Strong Together" : {
        "name" : "Strong Together",
        "brand" : "Cinq à Sept",
        "color" : ["grey"],
        "type" : "T-Shirt",
        "image" : "https://image.s5a.com/is/image/saks/0400012787086_HEATHERGREYWHITE"
      },
      "Nora Floral Boxy" : {
        "name" : "Nora Floral Boxy",
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
  }
};

function App() {
  return (
    <div>
      <Header />
      <TopList tops={ clothes.tops } />
      <div id = "bottom">
        bottom
      </div>
      <div id = "shoes">
        shoes
      </div>
      <Footer />
    </div>
  )
};

export default App;
