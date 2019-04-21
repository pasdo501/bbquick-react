import React from "react";

import AddToCartButton from "./AddToCartButton";

import "./ProductSummary.css";

const ProductSummary = ({ product }) => {
    const scrollToReviews = () => {
        const reviewsEl = document.getElementById("reviews");
        const { x, y } = reviewsEl.getBoundingClientRect();
        const scrollOptions = {
            left: x,
            top: y,
            behavior: "smooth",
        };
        window.scrollTo(scrollOptions);
    };

    const {
        id,
        name,
        sku,
        rating_count,
        rating_html,
        price_html,
        short_description,
    } = product;
    return (
        <div className="summary entry-summary">
            {rating_count > 0 && (
                <div className="woocommerce-product-rating">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: rating_html,
                        }}
                    />
                    <div
                        className="woocommerce-review-link"
                        onClick={scrollToReviews}
                    >
                        ({rating_count} customer reviews)
                    </div>
                </div>
            )}
            <p
                className="price"
                dangerouslySetInnerHTML={{
                    __html: price_html,
                }}
            />
            <p
                className="woocommerce-product-details__short-description"
                dangerouslySetInnerHTML={{ __html: short_description }}
            />
            <AddToCartButton id={id} name={name} sku={sku} />
        </div>
    );
};

export default ProductSummary;
