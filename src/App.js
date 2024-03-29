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
import ScrollToTopCopy from './ScrollToTop copy';
import SingleBlog from './page/SingleBlog';
import AllBlog from './page/AllBlog';
import FullCart from './page/FullCart';
import Checkout from './page/Checkout';



function App() {
  

  return (
    <div className="App">
      <Router>
      <Navbar />
      <ScrollToTopCopy />
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
        <Route exact path="/blog/:id">
          <SingleBlog />
        </Route>
        <Route exact path="/all-blog">
          <AllBlog />
        </Route>
        <Route exact path="/full-cart">
          <FullCart />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
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
