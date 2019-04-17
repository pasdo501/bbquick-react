import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductLoop from "./ProductLoop";
import Product from "./Product";
import NavMenuLinks from "./NavMenuLinks"

import { getWcData } from "../util/api";

class App extends Component {

  state = {
    products: [],
    categories: null,
  }

  async componentDidMount() {
      let { products, categories } = await getWcData();
      categories = Object.values(categories);

      // Turn Categories into associative array with cat IDs as keys
      categories = categories.reduce((prev, curr) => {
          curr.id = curr.term_id;
          delete curr.term_id;
          prev[curr.id] = curr;

          return prev;
      }, {})

      this.setState({
          products,
          categories,
      })

  }
  
  render() {
    const { products, categories } = this.state;

    return (
      <Router>
        <NavMenuLinks />
        {products && categories 
          ? (
            <Switch>
              <Route 
                path="/meal-category/:category"
                render={(props) => <ProductLoop {...props} products={products} categories={categories} perPage={18} />} 
              />
              <Route
                path="/frozen-meals/:slug"
                render={(props) => <Product {...props} products={products} />}
              />
            </Switch>
          ) : (
            <div>Loading ...</div>
          )}
      </Router>
    );
  }
}

export default App;
