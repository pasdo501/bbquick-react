import React from "react";

import ProductWrapper from "./ProductWrapper";
import ProductGallery from "./ProductGallery";

const Product = ({ match, products }) => {
    const productSlug = match.params.slug;

    const product = products.find((product) => product.slug === productSlug);

    console.log(product);

    const { rating_html, price_html, id, name } = product;
    const images = product.images.single_product;

    return (
        <ProductWrapper id={id} name={name}>
                <ProductGallery images={images} />
                <div className="summary entry-summary">
                    <div className="woocommerce-product-rating">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: rating_html,
                            }}
                        />
                        <div className="woocommerce-review-link">
                            Review Link Here
                        </div>
                    </div>
                    <p
                        className="price"
                        dangerouslySetInnerHTML={{
                            __html: price_html,
                        }}
                    />
                    <div className="woocommerce-product-details__short-description">
                        <p>Short description goes here</p>
                    </div>
                    <div className="uk-flex uk-flex-left uk-flex-middle cart">
                        <div className="quantity">
                            <label
                                className="screen-reader-text"
                                htmlFor={`quantity_${id}`}
                            >
                                Quantity
                            </label>
                            <select
                                id={`quantity_${id}`}
                                className="input-text qty text"
                                name="quantity"
                                title="Qty"
                                aria-labelledby={name}
                            >
                                <option value="1">1</option>
                            </select>
                        </div>
                        <a
                            className="button ajax_add_to_cart"
                            href={`?add-to-cart=${id}`}
                            onClick={() => console.log("clicked")}
                            rel="nofollow"
                        >
                            Add to Cart
                        </a>
                    </div>
                    <p className="ingredients">
                        <strong>Includes</strong>
                    </p>
                    <ul className="bundle-list">
                        <li>
                            <a href="bla">
                                <strong>2</strong>x Beef - Slow Roast
                            </a>
                        </li>
                        <li>
                            <a href="bla">Mac'N'Cheese'N'Ham</a>
                        </li>
                    </ul>
                </div>
            
        </ProductWrapper>
    );
};

export default Product;
