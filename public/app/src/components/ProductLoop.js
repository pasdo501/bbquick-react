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
            const productCategories = product.categories.filter(category => {
                return category.id === currentCategoryId ||
                    (categories[category.id.toString()] && 
                    categories[category.id.toString()].parent === currentCategoryId);
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
                                Showing 1-18 of 36 results (Make Me Dynamic)
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
                                                {/* Consider the DOM parsing lib used for photography */}
                                                <div dangerouslySetInnerHTML={{ __html: meal.images[0] }} />
                                                <div>{meal.name}</div>
                                                <span className="price" dangerouslySetInnerHTML={{ __html: meal.price_html }} />
                                                <div dangerouslySetInnerHTML={{ __html: meal.rating_html }} />
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
