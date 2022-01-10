import React from 'react';
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import {RecommendDisplayBlock}  from '../components/ItemDisplay'

const RecommendPage = (props) => {
  return (
    <div>
      <Header />
      <RecommendDisplayBlock/>
      <Footer />
    </div>
  )
};

export default RecommendPage;