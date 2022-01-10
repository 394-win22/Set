import React from 'react';
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import {ItemList, RecommendDisplayBlock}  from '../components/ItemDisplay'

const HomePage = (props) => {
return (
    <div>
      <Header />
      <ItemList />
      <RecommendDisplayBlock/>
      <Footer />
    </div>
  )
};

export default HomePage;