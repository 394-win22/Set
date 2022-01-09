import React from 'react';
import './App.css';
import Header from './components/Header.js'
import Footer from './components/Footer.js'



function App() {
  return (
    <div>
      <Header />
      <div id = "top">
        top
      </div>
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
