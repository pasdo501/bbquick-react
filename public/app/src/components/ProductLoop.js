import React, { Component } from "react";

import LoopProduct from "./LoopProduct";
import Pagination from "./Pagination";

import queryString from "query-string";

const sortProducts = (meals, sortBy) => {
    let sortedMeals = [];

    switch (sortBy) {
        case 'popularity':
            sortedMeals = meals.sort((a, b) => b.total_sales - a.total_sales);
            break;
        case 'rating':
        case 'latest':
        case 'price-asc':
        case 'price-desc':
            console.log(`Sorting by ${sortBy}`);
            break;
        case 'default':
        default:
            sortedMeals = meals.sort((a, b) => {
                const x = a.name.toLowerCase();
                const y = b.name.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
            break;
    }

    return {
        sortedMeals: sortedMeals.length ? sortedMeals : meals,
        sortBy
    }
}

class ProductLoop extends Component {
    state = {
        meals: [],
        categoryName: "",
        page: 1,
        sortBy: 'default',
    };

    handleSortChange = (event) => {
        const sortingMethod = event.target.value;
        const { meals } = this.state;

        const { sortedMeals, sortBy } = sortProducts(meals, sortingMethod);

        this.setState({
            meals: sortedMeals,
            sortBy
        })
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    static getDerivedStateFromProps(props, state) {
        const { products, categories, match, location } = props;
        const { categoryName, page, sortBy } = state;

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

        const { sortedMeals } = sortProducts(categoryMeals, sortBy);

        return {
            meals: sortedMeals,
            categoryName: currentCategoryName,
            page: currentPage,
        };
    }

    render() {
        const { meals: allMeals, categoryName, page, sortBy } = this.state;
        const { perPage, columns } = this.props;

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
                        <div className={`woocommerce columns-${columns}`}>
                            <p className="woocommerce-result-count">
                                {`Showing ${resultsFrom}-${resultsTo} of ${resultsCount} results`}
                            </p>
                            <div className="woocommerce-ordering">
                                <select className="orderby" name="orderby" value={sortBy} onChange={this.handleSortChange}>
                                    <option value="default">Default sorting</option>
                                    <option value="popularity">Sort by popularity</option>
                                    <option value="rating">Sort by average rating</option>
                                    <option value="latest">Sort by latest</option>
                                    <option value="price-asc">Sort by price: low to high</option>
                                    <option value="price-desc">Sort by price: high to low</option>
                                </select>
                            </div>
                            <ul className="products columns-3">
                                {meals.map((meal, index) => {
                                    const first =
                                        index % columns === 0 ? "first" : "";
                                    const last =
                                        (index + 1) % columns === 0 ? "last" : "";

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
