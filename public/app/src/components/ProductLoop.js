import React, { Component, Fragment } from "react";

import LoopProduct from "./LoopProduct";
import Pagination from "./Pagination";

import queryString from "query-string";
import SortDropdown from "./SortDropdown";
import ProductFilter from "./ProductFilter";

const sortProducts = (meals, sortBy) => {
    let sortedMeals = [];

    // Use ID as tie breaker (as per WooCommerce implementation)
    switch (sortBy) {
        case "popularity":
            sortedMeals = meals.sort((a, b) => {
                const salesDiff = b.total_sales - a.total_sales;
                return salesDiff !== 0 ? salesDiff : a.id - b.id;
            });
            break;
        case "rating":
            sortedMeals = meals.sort((a, b) => {
                const ratingDiff = parseFloat(b.rating) - parseFloat(a.rating);
                return ratingDiff !== 0 ? ratingDiff : a.id - b.id;
            });
            break;
        case "latest":
            sortedMeals = meals.sort((a, b) => b.date - a.date);
            break;
        case "price-asc":
            sortedMeals = meals.sort((a, b) => {
                const priceDiff = parseFloat(a.price) - parseFloat(b.price);
                return priceDiff !== 0 ? priceDiff : a.id - b.id;
            });
            break;
        case "price-desc":
            sortedMeals = meals.sort((a, b) => {
                const priceDiff = parseFloat(b.price) - parseFloat(a.price);
                return priceDiff !== 0 ? priceDiff : a.id - b.id;
            });
            break;
        case "default":
        default:
            // Default = Alphabetical
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
        sortBy,
    };
};

const filterMeals = (meals, filters) => {
    if (!filters.length) {
        return meals;
    }

    let mealsCopy = [...meals];

    filters.forEach((filter) => {
        const filterId = parseInt(filter);
        mealsCopy = mealsCopy.filter((meal) => {
            let categoryPresent = false;
            let ingredientPresent = false;

            meal.categories.forEach((category) => {
                if (categoryPresent) {
                    return;
                }
                if (category.id === filterId) {
                    categoryPresent = true;
                }
            });

            if (!categoryPresent) {
                // If not a category, filter might for ingredients
                ingredientPresent = meal.ingredients.includes(filterId);
            }

            return categoryPresent || ingredientPresent;
        });
    });

    return mealsCopy;
};

class ProductLoop extends Component {
    state = {
        meals: [],
        categoryName: "",
        page: 1,
        sortBy: "default",
        filters: [],
        filtersUpdated: false,
    };

    handleSortChange = (event) => {
        const sortingMethod = event.target.value;
        const { meals } = this.state;

        const { sortedMeals, sortBy } = sortProducts(meals, sortingMethod);

        this.setState({
            meals: sortedMeals,
            sortBy,
        });
    };

    handleFilterUpdate = (filters) => {
        this.setState({
            filters,
            filtersUpdated: true,
        });
    };

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    static getDerivedStateFromProps(props, state) {
        const { products, categories, match, location } = props;
        const { categoryName, page, sortBy, filtersUpdated, filters } = state;

        const qsValues = queryString.parse(location.search);
        const currentPage = qsValues["product-page"]
            ? parseInt(qsValues["product-page"])
            : 1;

        let currentCategoryId;
        let currentCategoryName;

        let otherTopLevelId;

        Object.keys(categories).forEach((key) => {
            if (categories[key].slug === match.params.category) {
                currentCategoryId = categories[key].id;
                currentCategoryName = categories[key].name;
                return;
            }

            if (categories[key].parent === 0) {
                // If not the category of the page currently being looked at,
                // but no parent, must be a top level category
                otherTopLevelId = key;
            }
        });

        if (currentCategoryName === categoryName && !filtersUpdated) {
            return page === currentPage ? null : { page: currentPage };
        }

        const categoryMeals = products.filter((product) => {
            let containsOtherTopLevelCat = false;

            const productCategories = product.categories.filter((category) => {
                if (category.id.toString() === otherTopLevelId) {
                    containsOtherTopLevelCat = true;
                }
                return (
                    category.id === currentCategoryId ||
                    (categories[category.id.toString()] &&
                        categories[category.id.toString()].parent ===
                            currentCategoryId)
                );
            });

            // Filter out products that are part of the other top level category,
            // and those that are not of the current page's category (or its children)
            return productCategories.length > 0 && !containsOtherTopLevelCat;
        });

        const filteredMeals = filterMeals(categoryMeals, filters);

        const { sortedMeals } = sortProducts(filteredMeals, sortBy);

        return {
            meals: sortedMeals,
            categoryName: currentCategoryName,
            page: currentPage,
            filtersUpdated: false,
        };
    }

    render() {
        const { meals: allMeals, categoryName, page, sortBy } = this.state;
        const { perPage, columns } = this.props;

        const resultsFrom = page === 1 ? page : 1 + perPage * (page - 1);
        let resultsTo;
        if (page === 1) {
            resultsTo = perPage < allMeals.length ? perPage : allMeals.length;
        } else {
            resultsTo =
                perPage * page < allMeals.length
                    ? perPage * page
                    : allMeals.length;
        }
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
                            <SortDropdown
                                value={sortBy}
                                handleChange={this.handleSortChange}
                            />
                            <ProductFilter
                                categories={this.props.categories}
                                ingredients={this.props.ingredients}
                                handleUpdate={this.handleFilterUpdate}
                                filters={this.state.filters}
                            />
                            <ul className="products columns-3">
                                {meals.map((meal, index) => {
                                    const first =
                                        index % columns === 0 ? "first" : "";
                                    const last =
                                        (index + 1) % columns === 0
                                            ? "last"
                                            : "";

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
                    ) : this.state.filters ? (
                        <Fragment>
                            <ProductFilter
                                categories={this.props.categories}
                                ingredients={this.props.ingredients}
                                handleUpdate={this.handleFilterUpdate}
                                filters={this.state.filters}
                            />
                            <div>Looks like there are no meals matching your current filters! 
                                Please change your filter selection to find meals.
                            </div>
                        </Fragment>
                    ) : (
                        <div>Loading Meals ...</div>
                    )}
                </div>
            </div>
        );
    }
}

export default ProductLoop;
