import React from 'react';
import './App.css';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import ItemList from './components/ItemDisplay'

function App() {
  return (
    <div>
      <Header />
      <ItemList />
      <Footer />
    </div>
  )
};

export default App;
