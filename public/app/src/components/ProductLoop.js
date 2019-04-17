import React, { Component } from "react";

import LoopProduct from "./LoopProduct";
import Pagination from "./Pagination";

import queryString from "query-string";

class ProductLoop extends Component {
    state = {
        meals: [],
        categoryName: "",
        page: 1,
    };

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    static getDerivedStateFromProps(props, state) {
        const { products, categories, match, location } = props;
        const { categoryName, page } = state;

        const qsValues = queryString.parse(location.search);
        const currentPage = qsValues["product-page"]
            ? parseInt(qsValues["product-page"])
            : 1;

        let currentCategoryId;
        let currentCategoryName;

        Object.keys(categories).forEach((key) => {
            if (categories[key].slug === match.params.category) {
                currentCategoryId = categories[key].id;
                currentCategoryName = categories[key].name;
            }
        });

        if (currentCategoryName === categoryName) {
            return page === currentPage ? null : { page: currentPage };
        }

        const categoryMeals = products.filter((product) => {
            const productCategories = product.categories.filter((category) => {
                return (
                    category.id === currentCategoryId ||
                    (categories[category.id.toString()] &&
                        categories[category.id.toString()].parent ===
                            currentCategoryId)
                );
            });

            return productCategories.length > 0;
        });

        return {
            meals: categoryMeals,
            categoryName: currentCategoryName,
            page: currentPage,
        };
    }

    render() {
        const { meals: allMeals, categoryName, page } = this.state;
        const { perPage } = this.props;

        const resultsFrom = page === 1 ? page : 1 + perPage * (page - 1);
        const resultsTo =
            page === 1
                ? perPage
                : perPage * page < allMeals.length
                ? perPage * page
                : allMeals.length;
        const resultsCount = allMeals.length;

        // Meals to display on the current page
        const meals = allMeals.slice(resultsFrom - 1, resultsTo);

        return (
            <div>
                <header>
                    <h2 className="h2 page-title">{categoryName}</h2>
                </header>
                <div className="tm-article-content">
                    {meals && meals.length ? (
                        <div className="woocommerce columns-3">
                            <p className="woocommerce-result-count">
                                {`Showing ${resultsFrom}-${resultsTo} of ${resultsCount} results`}
                            </p>
                            <ul className="products columns-3">
                                {meals.map((meal, index) => {
                                    const first =
                                        index % 3 === 0 ? "first" : "";
                                    const last =
                                        (index + 1) % 3 === 0 ? "last" : "";

                                    return (
                                        <li
                                            key={meal.id}
                                            className={`product type-product status-publish ${last} ${first}`}
                                        >
                                            <LoopProduct meal={meal} />
                                        </li>
                                    );
                                })}
                            </ul>
                            <Pagination
                                resultCount={resultsCount}
                                perPage={perPage}
                                currentPage={page}
                                path={this.props.location.pathname}
                            />
                        </div>
                    ) : (
                        <div>Loading Meals ...</div>
                    )}
                </div>
            </div>
        );
    }
}

export default ProductLoop;
