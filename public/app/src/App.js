import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavMenuLinks from "./components/NavMenuLinks";
import ProductLoop from "./components/ProductLoop";
import Product from "./components/Product";

import { getWcData } from "./util/api";
import Loading from "./components/Loading";

class App extends Component {
    state = {
        products: [],
        categories: null,
        ingredients: null,
    };

    async componentDidMount() {
        let { products, categories, ingredients } = await getWcData();
        categories = Object.keys(categories).map(key => categories[key]);

        // Turn Categories into associative array with cat IDs as keys
        categories = categories.reduce((prev, curr) => {
            curr.id = curr.term_id;
            delete curr.term_id;
            prev[curr.id] = curr;

            return prev;
        }, {});

        this.setState({
            products,
            categories,
            ingredients,
        });
    }

    render() {
        const { products, categories, ingredients } = this.state;

        return (
            <Router>
                {products && categories ? (
                    <Fragment>
                        <Route
                            render={(props) => <NavMenuLinks {...props} />}
                        />
                        <Switch>
                            <Route
                                exact
                                path="/shop/"
                                render={(props) => (
                                    <ProductLoop
                                        {...props}
                                        products={products}
                                        categories={categories}
                                        ingredients={ingredients}
                                        perPage={18}
                                        columns={3}
                                    />
                                )}
                            />
                            <Route
                                path="/meal-category/:category"
                                render={(props) => (
                                    <ProductLoop
                                        {...props}
                                        products={products}
                                        categories={categories}
                                        ingredients={ingredients}
                                        perPage={18}
                                        columns={3}
                                    />
                                )}
                            />
                            <Route
                                path="/frozen-meals/:slug"
                                render={(props) => (
                                    <Product {...props} products={products} />
                                )}
                            />
                        </Switch>
                    </Fragment>
                ) : (
                    <Loading />
                )}
            </Router>
        );
    }
}

export default App;
