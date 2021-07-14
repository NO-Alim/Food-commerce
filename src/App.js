import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Campaigns from './page/Campaigns';
import Contact from './page/Contact';
import Home from './page/Home'
import Sell from './page/Sell';
import Shop from './page/Shop';
import Error from './page/Error'
import FilteredProduct from './page/FilteredProduct';
import SingleProduct from './page/SingleProduct';



function App() {
  

  return (
    <div className="App">
      <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/campaigns">
          <Campaigns />
        </Route>
        <Route exact path="/sell">
          <Sell />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/products/:id">
          <FilteredProduct />
        </Route>
        <Route exact path="/product/:id">
          <SingleProduct />
        </Route>
        <Route exact path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
