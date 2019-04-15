import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductLoop extends Component {
    state = {
        meals: null,
        categoryName: ''
    }

    setMealsAndCategory = () => {
        const { products, categories, match } = this.props;
        const { categoryName } = this.state;

        let currentCategoryId;
        let currentCategoryName;

        Object.keys(categories).forEach(key => {
            if (categories[key].slug === match.params.category) {
                currentCategoryId = categories[key].id;
                currentCategoryName = categories[key].name;
            }
        });

        if (currentCategoryName === categoryName) {
            return;
        }

        const categoryMeals = products.filter(product => {
            if (product.status !== 'publish') {
                return false;
            }

            const productCategories = product.categories.filter(category => {
                return category.id === currentCategoryId ||
                    categories[category.id.toString()].parent === currentCategoryId;
            });

            return productCategories.length > 0;
        })

        this.setState({
            meals: categoryMeals,
            categoryName: currentCategoryName
        })
    }

    componentDidMount() {
        this.setMealsAndCategory();
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {
        this.setMealsAndCategory();
        window.scrollTo(0, 0);
    }

    render() {
        const { meals, categoryName } = this.state;

        return (
            <div>
                <header>
                    <h2 className="h2 page-title">
                        {categoryName}
                    </h2>
                </header>
                <div className="tm-article-content">
                    {meals && meals.length ? (
                        <div className="woocommerce columns-3">
                            <p className="woocommerce-result-count">
                                Showing 1-18 of 36 results
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
                                            <Link
                                                to={`/frozen-meals/${
                                                    meal.slug
                                                }`}
                                            >
                                                <img alt={meal.images[0].alt} className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" src={meal.images[0].src} srcSet="http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef-400x300.jpg 400w, http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef-510x382.jpg 510w, http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef-300x225.jpg 300w, http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef-768x576.jpg 768w, http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef.jpg 800w" />
                                                {meal.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
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
