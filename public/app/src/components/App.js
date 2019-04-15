import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import ProductLoop from "./ProductLoop";
import Product from "./Product";
import Portal from "./Portal";

import { getProducts, getCategories } from "../util/api";

class App extends Component {

  state = {
    products: [],
    categories: null,
    portals: []
  }

  setupPortals = () => {
    // Change ID to have mobile / normal differentiation
    const menuItems = document.querySelectorAll('[id^=js-menu-replace-]');
    if (!menuItems || ! menuItems.length) {
      return [];
    }

    const portals = [];

    menuItems.forEach((item, key) => {
      const parentEl = item.parentElement;
      parentEl.removeChild(item);

      // Strip any beans output HTML
      const linkTextClean = item.innerHTML.replace(/<!--.*?-->/g, '');
      // Strip leading domain stuff (get rid of http(s):// everything up to first slash)
      const link = '/' + item.href.replace(/http[s]?:\/\/.*?\//, '');

      portals.push(
        <Portal key={`portal-${key}`} portalRoot={parentEl}>
          <Link to={link}>
            {linkTextClean}
          </Link>
        </Portal>
      );
    })

    return portals;
  }

  async componentDidMount() {
      let [products, categories] = await Promise.all([
          getProducts(),
          getCategories()
      ]);

      // Turn Categories into associative array with cat IDs as keys
      categories = categories.reduce((prev, curr) => {
          prev[curr.id] = curr;

          return prev;
      }, {})

      const portals = this.setupPortals();

      this.setState({
          products,
          categories,
          portals
      })
  }
  
  render() {
    const { products, categories, portals } = this.state;

    return (
      <Router>
        {products && categories 
          ? (
            <Switch>
              <Route 
                path="/meal-category/:category"
                render={(props) => <ProductLoop {...props} products={products} categories={categories} />} 
              />
              <Route
                path="/frozen-meals/:slug"
                render={(props) => <Product {...props} products={products} />}
              />
            </Switch>
          ) : (
            <div>Loading ...</div>
          )}
        {portals && portals.map(portal => (
          portal
        ))}
      </Router>
    );
  }
}

export default App;
