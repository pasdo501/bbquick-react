import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import ProductLoop from "./ProductLoop";
import Product from "./Product";

import { getProducts, getCategories } from "../util/api";

class App extends Component {

  state = {
    products: [],
    categories: null
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

      this.setState({
          products: individualMeals,
          categories
      })
  }
  
  render() {
    const { products } = this.state;
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
      </Router>
    );
  }
}

export default App;
