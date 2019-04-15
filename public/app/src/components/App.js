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

      const linkTextClean = item.innerHTML.replace(/<!--.*?-->/g, '');
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

      let individualId = -1;

      // Turn Categories into associative array with cat IDs as keys
      categories = categories.reduce((prev, curr) => {
          if (individualId === -1 && curr.slug === 'a-la-carte-individual-meals') {
              individualId = curr.id;
          }
          prev[curr.id] = curr;

          return prev;
      }, {})

      const individualMeals = products.filter((product) => {
          if (product.status !== 'publish') {
              return false;
          }

          const productCategories = product.categories.filter(category => {
              return category.id === individualId ||
                  categories[category.id.toString()].parent === individualId
          });

          return productCategories.length > 0;
      });

      const portals = this.setupPortals();

      this.setState({
          products: individualMeals,
          categories,
          portals
      })
  }
  
  render() {
    const { products, portals } = this.state;

    return (
      <Router>
        <Switch>
          <Route 
            exact path="/meal-category/a-la-carte-individual-meals"
            render={(props) => <ProductLoop {...props} products={products} />} 
          />
          <Route
            path="/frozen-meals/:slug"
            render={(props) => <Product {...props} products={products} />}
          />
        </Switch>
        {portals && portals.map(portal => (
          portal
        ))}
      </Router>
    );
  }
}

export default App;
