import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductLoop extends Component {
    render() {
        const { products } = this.props;
        console.log(products[0]);

        return (
            <div>
                <header>
                    <h2 className="h2 page-title">
                        À La Carte (Individual Meals)
                    </h2>
                </header>
                <div className="tm-article-content">
                    {products.length ? (
                        <div className="woocommerce columns-3">
                            <p className="woocommerce-result-count">
                                Showing 1-18 of 36 results
                            </p>
                            <ul className="products columns-3">
                                {products.map((product, index) => {
                                    const first =
                                        index % 3 === 0 ? "first" : "";
                                    const last =
                                        (index + 1) % 3 === 0 ? "last" : "";

                                    return (
                                        <li
                                            key={product.id}
                                            className={`product type-product status-publish ${last} ${first}`}
                                        >
                                            <Link
                                                to={`/frozen-meals/${
                                                    product.slug
                                                }`}
                                            >
                                                <img alt={product.images[0].alt} className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" src={product.images[0].src} srcSet="http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef-400x300.jpg 400w, http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef-510x382.jpg 510w, http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef-300x225.jpg 300w, http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef-768x576.jpg 768w, http://bbquick.local/wp-content/uploads/bbquick-slow-roasted-beef.jpg 800w" />
                                                {product.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : (
                        <div>Loading Products ...</div>
                    )}
                </div>
            </div>
        );
    }
}

export default ProductLoop;
