//import logo from './logo.svg';
// import './App.css';
import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Routes, Route} from 'react-router-dom';


class App extends Component {
  render () {
    return (
      <div>
        <Layout>
         <Routes> 
           <Route path="/" element = {<BurgerBuilder/>}/>
           <Route path="/checkout" element = {<Checkout/>} />
         </Routes>
        </Layout>
      </div>
    );
  }
}

export default App;
